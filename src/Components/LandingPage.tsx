import { cn } from "@/lib/utils";
import { CarouselSize } from "./generic/GenericCarousel";
import { ScrollAreaDemo } from "./generic/GenericScrollArea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LandingPage() {
  return (
    <>
      <div
        className={cn(
          "flex flex-col pl-[160px] pr-[160px] text-center items-center  gap-y-5 "
        )}
      >
        <div className={cn("flex flex-col mt-14 mb-6")}>
          <p className={cn("text-[54px]")}>Find your dream job now.</p>
          <p className={cn("text-[23px]")}>Many jobs for you to explore.</p>
        </div>

        <Input
          className={cn("w-[850px] h-[70px] mb-14 rounded-full text-xl")}
          placeholder="          Enter skills/designations/companies  |"
        />
        <div className={cn("flex gap-x-5")}>
          <Button className={cn("w-[160px] h-[70px] rounded-xl")}>
            Remote
          </Button>

          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>MNC</Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Data Scien...
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Banking & ...
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Analytics
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Fresher
          </Button>
        </div>

        <div className={cn("flex gap-x-5")}>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Marketing
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Sales
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Engineering
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Fortune 500
          </Button>
          <Button className={cn("w-[160px] h-[70px]  rounded-xl")}>
            Startup
          </Button>
        </div>

        <div className={cn("text-[24px] mt-11")}>Top companies hiring now</div>

        <CarouselSize length={3} />

        <div className={cn("text-[24px] mt-8")}>
          Featured companies actively hiring
        </div>

        <div>
          <Button>All</Button>

          <Button>IT Services</Button>

          <Button>BFSI</Button>
        </div>

        <CarouselSize length={3} />

        <Button>View all companies</Button>

        <div className={cn("text-[24px] mt-8")}>
          Discover jobs across popular roles
        </div>

        <CarouselSize length={5} />

        <div className={cn("text-[24px] mt-8")}>Sponsored Companies</div>

        <div>
          <Button>All</Button>

          <Button>IT Services</Button>

          <Button>Technology</Button>

          <Button>Manufacturing & Production</Button>

          <Button>Infrastrucutre , Transport & Real Estate</Button>

          <Button>Healthcare & Life Sciences</Button>

          <Button>BFSI</Button>

          <Button>BPM</Button>
        </div>

        <CarouselSize length={3} />
        <CarouselSize length={3} />

        <Button>View all companies</Button>

        <CarouselSize length={3} />

        <div className={cn("flex gap-x-5")}>
          <div className={cn(" h-96 w-[484px] ")}>
            <ScrollAreaDemo width={480} />
          </div>

          <div className={cn(" h-96  w-72 ")}>
            <ScrollAreaDemo width={480} />
          </div>
        </div>
      </div>
    </>
  );
}
