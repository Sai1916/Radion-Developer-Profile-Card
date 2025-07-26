/* eslint-disable @typescript-eslint/no-unused-vars */
import { data } from "@/lib/data";
import DevHeader from "./DevHeader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import DevSkills from "./DevSkills";
import CardFooterComp from "./CardFooterComp";

// const Card = () => {
//   return (
//     <div className="md:w-96 w-11/12 bg-blue-500 h-fit flex flex-col items-center rounded-md overflow-hidden">
//         <div className="w-full flex justify-center p-2">
//             <p className="text-white font-mono">Radion</p>
//         </div>
//         <div className="px-4 w-full flex justify-between">
//             <Divider color="red-500" />
//         </div>
//         <div className="gap-4 flex flex-col justify-center p-2">
//             <p>efwef</p>
//             <p>efwef</p>
//             <p>efwef</p>
//             <p>efwef</p>
//         </div>
//     </div>
//   )
// }

type CardCompProps = {
  onClickShare: () => void;
};



// const CardComp = ({ onClickShare }: CardCompProps) => {
const CardComp = () => {
  return (
    <Card className="md:w-3/5 lg:w-3/7 xl:w-2/7 w-11/12 gap-2 flex items-center hover:shadow-2xl hover:cursor-pointer hover:scale-105 duration-300 transition-all">
      <CardHeader className="w-full flex items-center justify-center">
        <CardTitle className="">Radion</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="w-full">
        <div className="gap-2 w-full flex flex-col justify-center">
          <DevHeader name={data.name} title={data.title} />
          {/* Skills */}
          <DevSkills skills={data.skills} />
          {/* Experience */}
          {/* <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-blue-600">Experience</p>
                  {data.experience.map(item => <Experience key={item.id} item={item}/>)}
                </div> */}
          {/* Education */}
          {/* <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-blue-600">Education</p>
                  {data.education.map(item => <Education key={item.id} item={item}/>)}
                </div> */}
        </div>
      </CardContent>
      <CardFooterComp socials={data.socials} />
    </Card>
  );
};

export default CardComp;
