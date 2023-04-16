import secrets
import hashlib
from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from requests import request
import Image
import openai
import torch
from diffusers import DiffusionPipeline, UniPCMultistepScheduler

import TextGenerator

model_id = "runwayml/stable-diffusion-v1-5"
mid_id = "prompthero/openjourney"
torch.backends.cuda.matmul.allow_tf32 = True

def create_scene(prompt, file_name):
    pipe = DiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe = pipe.to("cuda")
    pipe.enable_model_cpu_offload()
    pipe.safety_checker = lambda images, clip_input: (images, False)
    pipe.enable_attention_slicing(1)
    pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
    #pipe.enable_attention_slicing()
    pipe.enable_vae_tiling()
    pipe.enable_xformers_memory_efficient_attention()
    image = pipe([prompt], width=320, height=320, num_inference_steps=25).images[0]
    image.save("/home/bellh14/PycharmProjects/StoryGame/static/" + file_name)

def format_prompt(previous_scenes):

    fp = "previous scenes:\n"
    for scene in previous_scenes:
        fp += "- "
        fp += scene.get("prompt") + '\n'

    fp += "generate a 10 word description of what happens next:"

    return fp

class Item(BaseModel):
    prompt_array: list



app = FastAPI()
openai.api_key = "sk-#############################"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
app.mount("/static/", StaticFiles(directory="static"), name="static")

@app.post("/")

async def create_item(item: Item):
    # Generate a random string of 16 characters
    random_string = secrets.token_hex(8)

    # Generate an MD5 hash of the random string
    hash_value = hashlib.md5(random_string.encode("utf-8")).hexdigest()

    image_name = hash_value + ".png"


    # Define the prompt
    prompt = format_prompt(item.prompt_array)

    # Generate the response
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Extract the generated text from the response and split it into lines
    output_lines = response.choices[0].text.strip().splitlines()

    # Extract the first line
    output = output_lines[0].strip("- ")
    print(output)
    create_scene(output, image_name)
    prompt_dict = {"image": image_name,
                   "prompt": output}
    return prompt_dict







