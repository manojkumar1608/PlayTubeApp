import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  { useSelector }  from 'react-redux';
import { useForm } from 'react-hook-form'
import Input from './Input';
import Button from './Button';
import { BiLogIn } from "react-icons/bi";
import { RiVideoUploadFill } from "react-icons/ri";

function UploadVideo() {
    const navigate = useNavigate();
    const authstatus = useSelector((state) => state.auth.status);

    const video = ""
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: video?.title || "",
            description: video?.description || "",
            thumbnail: video?.thumbnail || "",
            videoFile: video?.videoFile || "",
            isPublished: video?.status || "published",
        },
    });


    const submit = async (data) => {
        if (video) {
            const file = data.thumbnail[0] ? await axios.patch('') : null;

            if (file) {
                await axios.delete('');
            }

            const dbvideo = await appwriteService.updatePost(post.$id, {
                ...data,
                thumbnail: file ? file._id : undefined,
                videofile: file ? file._id : undefined
            });

            if (dbvideo) {
                // navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file._id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data,  });

                if (dbPost) {
                    // navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };
    
if(authstatus === true){
return (
    
    <div className='flex justify-center items-center w-full  flex-col bg-gradient-to-b from-gray-200 to-gray-300 '>
        
        
        <RiVideoUploadFill className='inline-block text-red-700 size-10 max-w-[100px] '/>
        <h1 className='font-bold rounded-xl  text-center text-3xl mb-4 shadow-xl'>
             Upload Video</h1>
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap font-medium  border-2 border-black shadow-black shadow-lg rounded-xl  p-4 
    ">
    <div className="w-60 px-2">
        <Input 
            label="Title :"
            placeholder= "Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label ="Description:"
            placeholder="Description"
            className=""
            {...register("description", { required: true })}
            
        />
    </div>
    <div className=" px-2 flex flex-col w-full">
        <Input
            label="Thumbnail:"
            type="file"
            className="mb-4 bg-gray-700 text-white" 
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("thumbnail", { required: !video })}
        />
        {video && (
            <div className="w-full mb-4">
                <img
                    src={""}
                    alt={video.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Input
            label="video:"
            type="file"
            className="mb-4 bg-gray-700 text-white"
            accept="*/video "
            {...register("video", { required: !video })}
        />
      
        <label 
  htmlFor="AcceptConditions"
  className="relative px-4 mx-4  h-8 w-14 cursor-pointer rounded-full bg-gray-700 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
>
  <input type="checkbox" id="AcceptConditions" className="peer sr-only" 

  />

  <span
    className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6">
        
  </span>
</label>
  <h1 className='font-bold mx-2 px-3 '>Publish</h1>

        <Button type="submit" bgColor={video ? "bg-green-500" : undefined} className="w-fit m-auto bg-red-700 ">
            {video ? "Update" : "Upload" }
        </Button>
    </div>
</form>
</div>

          )
        }else{
            return(
                <>
                <div className='w-full h-screen bg-gradient-to-r from-gray-200 to-gray-500'>
            <div className='flex  justify-center '>
                <BiLogIn className='text-7xl mt-10 mr-2'/>
                <h1 className='text-3xl font-bold mt-12'>Login to Upload Video</h1>
            </div>
            <div className='flex justify-center '>
                <Link to={'/login'}>
                <Button 
                type='button'
                onClick={()=>{hello}}
                
                className='bg-red-700 rounded-lg'>
                    Login
                </Button>
                </Link>

            </div>
            </div>

            </>
            )
        }
        
        }


export default UploadVideo