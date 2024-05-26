import AppStore from "/Appstore.png";
import Playstore from "/Playstore.png";

export const FooterProps: FooterTypes[] = [
  {
    name: 'USEFUL LINKS',
    subs: ['About', 'Products', 'Investors', 'Support']
  },
  {
    name: 'OTHERS',
    subs: ['FAQs', 'Contact Us', 'Privacy Policy', 'Terms & Condition']
  },
  {
    name: 'PARTNERS',
    subs: ['Microsoft for Startups']
  },
  {
    name: 'Discover Us',
    subs: ['651 N Broad St, 201, Middletown', 'Delaware 19709, United States', '4, Soretire Street, Ogba, Ikeja, Lagos'],
    subName: 'Download App',
    platforms: [AppStore, Playstore]
  }
]