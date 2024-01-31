import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm"

export const FacilitiesSection = () => {
  const {register, formState: { errors }} = useFormContext<HotelFormData>()

  return (
    <div className="mt-7">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility, index) => (
          <label key={index} className="flex gap-1 text-sm cursor-pointer">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true
                  }
                  return "At least one facility is required"
                }})
              }
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  )
}