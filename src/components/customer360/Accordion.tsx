import { useEffect, useState } from "react";
import classnames from "classnames";

type Props = {
  title: string;
  expand?: boolean;
  children: React.ReactNode;
}

const Accordion = ({ title, expand, children }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (expand) {
      setOpen(expand);
    }
  }, [expand]);

  return (
    <div className="min-h-[20px]">
      <div className='bg-[#fff] flex gap-x-4 px-5 py-1.5 border border-[#eeeeee] cursor-pointer' onClick={() => setOpen(!open)}>
        <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#CF2A2A" fill-rule="evenodd" d="M11 9h9v2h-9v9H9v-9H0V9h9V0h2v9Z" clip-rule="evenodd"/></svg>
        <span className="flex text-[18px] text-[#6F6F6F] font-medium my-auto">{title}</span>
      </div>
      <div className={classnames('flex overflow-hidden transition-all ease-in-out', { 'h-0': !open, 'h-auto': open })}>
        {children}
      </div>
    </div>
  )
}

export default Accordion
