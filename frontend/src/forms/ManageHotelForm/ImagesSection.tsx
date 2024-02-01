import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm"

export const ImagesSection = () => {
  const {register, watch, setValue, formState: { errors }} = useFormContext<HotelFormData>()

  const existingImageUrls = watch("imageUrls")

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string) => {
    event.preventDefault()
    setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl))
  }

  return (
    <div className="mt-7">
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div key={url} className="relative group">
                <img src={url} className="min-h-full object-cover" alt="" />
                <button
                  onClick={event => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          className="w-full text-gray-700 font-normal"
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0)

              if (totalLength === 0) {
                return "At least one image should be added"
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6"
              }

              return true
            } 
          })
          }
        />
        {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
        )}
      </div>
    </div>
  )
}

function setValue(arg0: string, arg1: string[]) {
  throw new Error("Function not implemented.");
}
