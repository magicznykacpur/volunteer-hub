import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getOpportunites } from "./dashboard.actions";

export default async function Dashboard() {
  const opportunites = await getOpportunites();

  const getFormattedDate = (date: Date) => (
    <strong className="ml-4">
      {formatDate(date, {
        locale: "pl-PL",
        dateStyle: "short",
        timeStyle: "short",
      })}
    </strong>
  );
  return (
    <>
      {!opportunites ||
        (opportunites.length === 0 && (
          <div className="flex justify-center w-full text-2xl my-10">
            No opportunites found
          </div>
        ))}

      {opportunites && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
          {opportunites.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="m-3 h-[300px] hover:cursor-pointer hover:shadow-md dark:hover:shadow-white hover:shadow-black"
            >
              <CardHeader>
                <CardTitle>{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent className="h-1/2 overflow-y-hidden">
                {opportunity.description}
              </CardContent>
              <CardFooter className="flex justify-between">
                Save the date:
                {getFormattedDate(opportunity.date)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
