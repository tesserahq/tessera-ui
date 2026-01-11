// import { Form } from "@remix-run/react";
// import React from "react";
// import { Button } from "../../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
// import { cn } from "../../../utils/misc";

// interface FormWrapperProps {
//   title: string;
//   children: React.ReactNode;
//   method: "POST" | "PUT" | "PATCH" | "DELETE";
//   isSubmitting: boolean;
//   onCancel?: () => void;
//   submitText?: string;
//   cancelText?: string;
//   className?: string;
//   showActions?: boolean;
//   actions?: React.ReactNode;
//   hiddenInputs?: Record<string, string>;
// }

// export default function FormWrapper({
//   title,
//   children,
//   method = "POST",
//   onCancel,
//   submitText = "Save",
//   cancelText = "Cancel",
//   isSubmitting = false,
//   className,
//   showActions = true,
//   actions,
//   hiddenInputs,
// }: FormWrapperProps) {
//   return (
//     <div className="coreui-content-center">
//       <Card className={cn("coreui-card-center", className)}>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <CardContent className="px-6 pb-5">
//           <Form method={method}>
//             {hiddenInputs &&
//               Object.entries(hiddenInputs).map(([name, value]) => (
//                 <input key={name} name={name} value={value} type="hidden" />
//               ))}
//             {children}
//             {showActions && (
//               <div className="mt-10 flex justify-end gap-2">
//                 {onCancel && (
//                   <Button type="button" variant="outline" onClick={onCancel}>
//                     {cancelText}
//                   </Button>
//                 )}
//                 <Button type="submit" disabled={isSubmitting}>
//                   {isSubmitting ? "Saving..." : submitText}
//                 </Button>
//                 {actions}
//               </div>
//             )}
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
