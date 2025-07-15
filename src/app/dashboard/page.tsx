"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchingState } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useBoundStore } from "@/stores/bound-store";
import { getOpportunites } from "@/lib/api/opportunites";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [opportunitesFetchingState, setOpportunitesFetchingState] =
    useState<FetchingState>("idle");
  const { opportunites, setOpportunites } = useBoundStore();

  const getFormattedDate = (date: Date) => (
    <strong className="ml-4">
      {formatDate(date, {
        locale: "pl-PL",
        dateStyle: "short",
        timeStyle: "short",
      })}
    </strong>
  );

  const fetchOpportunites = async () => {
    if (!opportunites) {
      setOpportunitesFetchingState("fetching");

      const dbOpportunites = await getOpportunites();
      setOpportunites(dbOpportunites);

      setOpportunitesFetchingState("success");
    }

    setOpportunitesFetchingState("success");
  };

  useEffect(() => {
    fetchOpportunites();
  }, []);

  return (
    <>
      {!opportunites ||
        (opportunites.length === 0 && (
          <div className="flex justify-center w-full text-2xl my-10">
            No opportunites found
          </div>
        ))}

      {opportunitesFetchingState === "fetching" && (
        <div className="flex justify-center w-full">
          <Loader2 size={42} className="animate-spin my-10" />
        </div>
      )}

      {opportunites && opportunites?.length > 0 && (
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
