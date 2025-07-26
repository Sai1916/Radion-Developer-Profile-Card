import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ExperienceItem = {
  item: {
    id: number;
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    image: string;
    isResigned: boolean;
  };
};

const Experience = ({ item }: ExperienceItem) => {
  return (
    <div className="flex items-start gap-1 justify-between w-full">
      <div className="flex gap-2 w-2/3 md:w-3/5">
        <Avatar>
          <AvatarImage src={item?.image} alt={item.company} />
          <AvatarFallback>
            {item.company.charAt(0).toUpperCase() +
              item.company.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-wrap text-wrap">
          <p className="text-sm font-semibold">{item.title}</p>
          <p className="text-xs font-bold text-gray-500">{item.company}</p>
        </div>
      </div>
      <div className="flex w-1/3">
        <p className="text-xs text-wrap flex items-start">
          {item.startDate} - {item.isResigned ? item.endDate : "Present"}
        </p>
      </div>
    </div>
  );
};

export default Experience;
