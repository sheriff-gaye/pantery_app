"use client"

import {
    Card,
    CardContent,
 
    CardHeader,
    CardTitle
  } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";


interface dataCardProps{
    title: string;
    icon:LucideIcon
    value:any
    desc:string
}

const DataCard=({title,icon:Icon,value,desc}:dataCardProps)=>{

    return(
        <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
           {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            {desc}
          </p>
        </CardContent>
      </Card>
    )
}

export default DataCard