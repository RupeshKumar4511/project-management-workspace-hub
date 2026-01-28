import { useRef } from "react";
import { useForm } from "react-hook-form";

export default function WorkspaceList() {
  const formRef = useRef(null);
  const { register, handleSubmit,reset, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    // add user email to data
    console.log(data);
    
    reset({
            workspaceName:'',
            workspacePassword:'',
            
        })
  };

  return (
    <div className="w-[50%] space-y-8 relative -top-20">
      {/* Join Workspace Form */}
      <div className="rounded-3xl bg-white shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Join Your Organization Workspace
        </h3>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Organization/Workspace Name
            </label>
            <input
              type="text"
              name="workspaceName"
              placeholder="e.g. Acme Corp"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("workspaceName", {
                        required: "workspaceName is required",
                        maxLength: {
                            value: 20 , message: "Length of workspaceName should not exceeds 20 characters."
                        }
                    })}
            />
            <span className="text-red-500 md:text-sm text-[12px] ">{errors.workspaceName?.message}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Workspace Password
            </label>
            <input
              type="password"
              name="workspacePassword"
              placeholder="Enter workspace password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("workspacePassword", {
                        required: "workspacePassword is required",
                        minLength: {
                            value: 8 , message: "Length of workspacePassword must be atleast 8 characters long."
                        }
                    })}
            />
            <span className="text-red-500 md:text-sm text-[12px] ">{errors.workspacePassword?.message}</span>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition"
          >
            Join Workspace
          </button>
        </form>
      </div>

      
    </div>
  );
}
