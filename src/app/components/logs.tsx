import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Log } from "../(root)/types";
import { Button } from "@/components/ui/button";
import { useLogs } from "../context/logsContext";
import { ArrowRightOutlined } from "@/assets/icons/arrow-right-outlined";
import { DeleteOutlined } from "@/assets/icons/delete-outlined";
import { formatTimeDistance } from "@/lib/helpers";

type LogsProps = {
  logs: Log[];
};

const Logs = ({ logs }: LogsProps) => {
  const { clearAllLogs, removeLog } = useLogs();

  return logs.length > 0 ? (
    <Card className="py-5!">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:px-5!">
        <span className="text-bodyMd">CONVERSION LOG</span>

        <div className="flex items-center justify-between gap-4 w-full sm:w-fit">
          <span className="uppercase text-captionMd">
            {logs.length.toLocaleString()} LOGGED
          </span>

          <Button variant="outline" onClick={clearAllLogs}>
            CLEAR ALL
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:px-5!">
        {logs
          .sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
          )
          .map((item) => {
            const [base, to] = item.pair.split("/");

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border border-neutral-500 bg-neutral-600 rounded-10 py-3 sm:py-4 px-3 sm:px-4"
              >
                <div className="flex items-center gap-4 text-bodySm">
                  <span className="min-w-16 text-neutral-200">
                    {formatTimeDistance(item.time)}
                  </span>

                  <div className="flex items-center gap-2">
                    <span>{base}</span>
                    <ArrowRightOutlined className="text-neutral-200" />
                    <span>{to}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-end gap-0.5 sm:items-center sm:gap-5 text-bodyMd">
                    <span className="text-neutral-100 ">1,000.00</span>
                    <span className="text-lime-500">853.02</span>
                  </div>

                  <Button
                    onClick={() => removeLog(item.id)}
                    variant="outline"
                    className="w-8!"
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="text-h3 text-neutral-100">No conversions logged yet</div>
      <div className="w-5/6 text-neutral-200 text-bodySm text-center lg:w-4/6">
        Every conversion is recorded here automatically when you tap LOG
        CONVERSION. Your log is private to this session and this browser.
      </div>
    </div>
  );
};

export default Logs;
