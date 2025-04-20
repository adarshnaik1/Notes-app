import { Badge } from "@/components/ui/badge"

 function CheckStatus(status){
  if(status=="pending") return(<Badge className="bg-red-400/60" variant="destructive">Pending</Badge>);
  if(status=="in_progress") return(<Badge className="bg-yellow-400/60"  variant="secondary">In Progress</Badge>);
  if(status=="completed") return(<Badge className="bg-green-400/30">Completed</Badge>);
    
 }

export default function TodoCard({ todo }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 min-w-[250px] min-h-[140px] max-w-xs justify-center flex flex-col gap-2 border border-gray-700">
      <div className="font-semibold text-lg truncate">{todo.title}</div>
      <div className="text-sm text-gray-300 line-clamp-3">{todo.description}</div>
      <div className="text-xs text-gray-400 mt-2">{CheckStatus(todo.status)}</div>
    </div>
  );
}
