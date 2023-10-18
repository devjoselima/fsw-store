import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { CATEGORY_ICON } from "@/constants/category-icons"

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {

  return ( 
    <Badge className="py-3 flex justify-center items-center gap-2 rounded-lg" variant="outline" >
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
      <span className="font-bold text-xs">{category.name}</span>
    </Badge>
   );
}
 
export default CategoryItem;