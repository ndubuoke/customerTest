import { useRef, useEffect, useState } from "react";

type Props = {
  title: string;
  expand?: boolean;
  children: React.ReactNode;
}

const Accordion = ({ title, expand = false, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(-0);

  const contentContainer = useRef(null);

  useEffect(() => {
    if (height === -0) {
      setHeight(contentContainer.current.offsetHeight);
    }
    // expand or collapse
    if ((expand && open) || open) {
      contentContainer.current.style.height = `${height}px`;
    } else {
      contentContainer.current.style.height = '0px';
    }
  }, [open]);
  
  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  return (
    <div className="min-h-[20px]">
      <div className='bg-[#fff] flex gap-x-4 px-5 py-1.5 border border-[#eeeeee] cursor-pointer' onClick={() => setOpen(!open)}>
        <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#CF2A2A" fillRule="evenodd" d="M11 9h9v2h-9v9H9v-9H0V9h9V0h2v9Z" clipRule="evenodd"/></svg>
        <span className="flex text-[18px] text-[#6F6F6F] font-medium my-auto">
          {title}
        </span>
      </div>
      <div ref={contentContainer} className='flex overflow-hidden transition-all ease-in-out'>
        {children}
      </div>
    </div>
  )
}

export default Accordion
