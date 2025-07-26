import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type EducationItem = {
  item: {
    id: number;
    college: string;
    degreeType: string;
    major: string;
    startYear: string;
    endYear: string;
    image: string;
    isGraduated: boolean;
  };
};

const Education = ({ item }: EducationItem) => {
  return (
    <div className="flex items-start gap-1 justify-between w-full">
      <div className="flex gap-2 w-2/3 md:w-3/5">
        <Avatar>
          <AvatarImage src={item?.image} alt={item.college} />
          <AvatarFallback>
            {item.college.charAt(0).toUpperCase() +
              item.college.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-wrap text-wrap">
          <p className="text-sm font-semibold">{item.degreeType} in {item.major}</p>
          <p className="text-xs font-bold text-gray-500">{item.college}</p>
        </div>
      </div>
      <div className="flex w-1/3 lg:w-1/3">
        <p className="text-xs text-wrap flex items-start">
          {item.startYear} - {item.isGraduated ? item.endYear : "Present"}
        </p>
      </div>
    </div>
  );
};

export default Education;
