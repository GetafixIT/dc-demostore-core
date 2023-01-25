import {FC} from "react";
import ReactMarkdown from 'markdown-to-jsx';

import {Details, FaqWrapper} from "./styles";

import {default as Chevron} from './chevron.svg';


export type FaqsProps = {
  _meta: {
      "name":string;
      "schema":string,
      "deliveryId":string;
    },
  faqs:{answer:string,question:string}[]
}

export const Faqs: FC<FaqsProps> = (content) => {

  const {faqs} = content

  return(
    <FaqWrapper>
      {faqs.map((item) => {
        return <>

            <Details>
              <summary><Chevron /> {item.question} </summary>
              <div>
                <ReactMarkdown>{item.answer}</ReactMarkdown>
              </div>
            </Details>

        </>
      })}
    </FaqWrapper>

  );
}

export default Faqs;
