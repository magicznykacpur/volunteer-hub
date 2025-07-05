import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/config/prisma.config";

export default async function Dashboard() {
  const opportunites = await prisma.opportunity.findMany();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
      {opportunites.map((opportunity) => (
        <Card
          key={opportunity.id}
          className="m-3 h-[300px] hover:cursor-pointer hover:bg-gray-100 hover:shadow-xl"
        >
          <CardHeader>
            <CardTitle>{opportunity.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-1/2 overflow-y-hidden">
            {opportunity.description}
          </CardContent>
          <CardFooter className="flex justify-between w-4/5">
            Save the date:
            <strong>
              {` ${opportunity.date.toLocaleDateString()}`}
              {` ${opportunity.date.toLocaleTimeString()}`}
            </strong>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
