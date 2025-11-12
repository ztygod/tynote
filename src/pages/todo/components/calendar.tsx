import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function CalendarItem() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="lg:col-span-1 space-y-8">
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <CalendarIcon size={20} className="text-red-500" /> 日历
          </h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 rounded-lg border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            required
          />
        </section>
      </div>
    </>
  );
}
