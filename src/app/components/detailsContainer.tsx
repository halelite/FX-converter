import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Content } from "next/font/google";

const DetailsContainer = () => {
  const tabItems = [
    {
      value: "history",
      title: "HISTORY",
      content: <div>HISTORY CONTENT</div>,
    },
    {
      value: "compare",
      title: "COMPARE",
      content: <div>COMPARE CONTENT</div>,
    },
    {
      value: "favorites",
      title: "FAVORITES",
      content: <div>FAVORITES CONTENT</div>,
    },
    {
      value: "log",
      title: "LOG",
      content: <div>LOG CONTENT</div>,
    },
  ];

  return (
    <Tabs defaultValue="history">
      <div className="border-b border-b-neutral-600">
        <TabsList variant="line">
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DetailsContainer;
