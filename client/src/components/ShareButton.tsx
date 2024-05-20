import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { WhatsappShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, TelegramShareButton } from 'react-share';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare, FaTelegram } from "react-icons/fa";


type ShareButtonProps = {
  classNames: string;
  eventTitle: string;
  link: string;
  hashtags?: string[];
  share: boolean;
  setShare: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShareButton({ share, setShare, classNames, eventTitle, link, hashtags }: ShareButtonProps) {

  const iconClassNames = "cursor-pointer hover:scale-[1.04] active:scale-[1] transition-transform";

  const copyText = async (link: string) => {
    if (!navigator.clipboard) {
      toast.warn('Unable to copy link')
      setShare(false);
      return;
    }
    await navigator.clipboard.writeText(link);
    setShare(false);
    toast.info('link copied!!')
  }

  const onclick = () => setShare(false);

  return (
    <article className={`${share ? 'scale-[1]' : 'scale-0'} duration-300 transition-transform flex gap-2.5 p-3 rounded-lg shadow-xl ${classNames}`}> 
      <MdOutlineContentCopy onClick={() => copyText(link)} className={iconClassNames} />

      <WhatsappShareButton
        title={eventTitle} url={link}
      >
        <IoLogoWhatsapp 
        onClick={onclick}
        className={iconClassNames} />
      </WhatsappShareButton>

      <TwitterShareButton
        title={eventTitle} url={link} hashtags={hashtags} 
        >
        <FaSquareXTwitter 
          className={iconClassNames} 
          onClick={onclick}
        />
      </TwitterShareButton>

      <FacebookShareButton
        title={eventTitle} url={link} 
        >
        <FaFacebookSquare 
          onClick={onclick}
          className={iconClassNames} 
          />
      </FacebookShareButton>

      <TelegramShareButton
        title={eventTitle} url={link} 
        >
        <FaTelegram className={iconClassNames} 
        onClick={onclick}
        />
      </TelegramShareButton>

      <LinkedinShareButton
        title={eventTitle} url={link}
      >
        <FaLinkedin className={iconClassNames}
          onClick={onclick}
        />
      </LinkedinShareButton>
    </article>
  )
}