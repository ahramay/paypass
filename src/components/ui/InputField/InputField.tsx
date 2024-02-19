// import Input from '../Input/Input'
// import { useFormContext } from 'react-hook-form' // Import react-hook-form components

// interface InputFieldProps {
//     label: string
//     id?: string
//     required?: boolean // Add a 'required' prop for indicating mandatory fields
//     inputSpace?: string
//     labelSpace?: string
//     className?: string // Add an inputClassName prop for the Input component
//     name?: string
//     placeholder?: string
//     // ... other props
// }

// const InputField: React.FC<InputFieldProps> = ({
//     label,
//     id,
//     name="",
//     required,
//     className,
//     inputSpace,
//     labelSpace,
//     placeholder,
//     ...restProps
// }) => {
//     const { register, formState } = useFormContext() // Access the form context from react-hook-form
//     const { errors } = formState

//     return (
//         <div className={inputSpace ? `mb-${inputSpace}` : 'mb-4'}>
//             <label
//                 className={`${
//                     labelSpace ? `mb-${labelSpace}` : 'mb-2'
//                 } form-label`}
//                 htmlFor={id}
//             >
//                 {label} {required && <span className="text-red-600">*</span>}
//             </label>
//             <Input
//              {...restProps}
//                 id={id}
              
//                 className={className}
//                 {...register(name, { required: required })} // Register the input and set validation rules
               
//                 placeholder={placeholder}
//                 required={required}
//             />
//             {errors[name] && <span className="text-red-600">This field is required</span>}
//         </div>
//     )
// }

// export default InputField
