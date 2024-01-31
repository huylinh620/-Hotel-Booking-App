import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

export const DetailsSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <div className="flex-1">
        <label htmlFor="name" className="text-gray-700 text-sm font-bold">Name</label>
        <input
          id="name"
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="city" className="text-gray-700 text-sm font-bold flex-1">City</label>
          <input
            id="city"
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">Country</label>
          <input
            id="country"
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <label htmlFor="description" className="text-gray-700 text-sm font-bold flex-1">Description</label>
        <textarea
          id="description"
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="flex-1 max-w-[50%]">
        <label htmlFor="pricePerNight" className="text-gray-700 text-sm font-bold flex-1">Price Per Night</label>
        <input
          type="number"
          id="pricePerNight"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </div>
      <div className="flex-1 max-w-[50%]">
        <label htmlFor="starRating" className="text-gray-700 text-sm font-bold flex-1">Star Rating</label>
        <select
          id="starRating"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("starRating", { required: "This field is required" })}
        >
          <option>Select as Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </div>
    </div>
  )
}
