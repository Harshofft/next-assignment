import Image from "next/image";
import img1 from '../public/assets/Content.png'
import DocumentTable from "@/app/components/DocumentTable";
export default function Home() {
  return (
    <div className="flex">
      <div className="h-[1422px] w-[248px] bg-blue-950">hello</div>
      <div className="w-full h-full flex flex-col">
        <div className="h-[80px] w-[1192px]  bg-white"></div>
        <div className="w-[1128px] h-[586px] bg-amber-600">
        </div>

        <div className="h-[709px] w-[1192px] px-[32px] max-w-[1280px] gap-[24px] bg-white text-black">
          <div className="w-[1128px] h-[709px] bg-white/20">
            {/* header */}
            <div className="w-[1128px] h-[93px]  flex flex-col justify-between  bg-[#FFFFFF] ">
              <div className="px-[24px] pt-[20px] h-[72px] w-[1128px] "><Image src={img1} alt="img" className="h-[72px] mb-[7px]  "/> </div>
              <div className="border-b-[1px] border-[#fcfcfd] "></div>
            </div>
            {/* table */}
            <DocumentTable />
          
          </div>
        </div>
      </div>
    </div>
  );
}
