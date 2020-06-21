import styled, {keyframes} from 'styled-components';
import teaser from '../../../images/banner_img.jpg';
import bannerBackground from '../../../images/hero_banner_background.jpg';

const fontColorBanner = '#fff';

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
`;

export const LogoWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 40px;
  left: 40px;
`;

export const LogoWrapperMobile = styled(LogoWrapper)`
  margin-left: -20px;
`;

export const LogoTextWrapper = styled.div`
  margin-left: 1vw;
  text-decoration: none;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
  float: left;
  line-height: 20px;
  letter-spacing: 1px;
  font-family: 'Lato', sans-serif;
`;

export const LogoTextWrapperMobile = styled(LogoTextWrapper)`
  margin-left: 10px;
`;

export const Name = styled.div`
  font-size: 18px;
  vertical-align: baseline;
  cursor: default;
`;

export const NameMobile = styled(Name)`
  font-size: 15px;
`;

export const Title = styled.div`
  font-size: 14px;
  cursor: default;
`;

export const TitleMobile = styled(Title)`
  font-size: 12px;
`;

const fadein = keyframes`
  from {
        opacity:0;
    }
    to {
        opacity:1;
    }
`;

export const Teaser = styled.div`
  width: 45%;
  height: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${teaser});
  background-size: cover;
  animation: ${fadein} 1s;
    -moz-animation: ${fadein} 1s; /* Firefox */
    -webkit-animation: ${fadein} 1s; /* Safari and Chrome */
    -o-animation: ${fadein} 1s; /*Opera */
`;

export const TeaserMobile = styled(Teaser)`
  width: 100%; 
  background-position: center;
`;

export const BannerContent = styled.div`
  width: 55%;
  height: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url(${bannerBackground}) no-repeat center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadein} 2s;
    -moz-animation: ${fadein} 2s; /* Firefox */
    -webkit-animation: ${fadein} 2s; /* Safari and Chrome */
    -o-animation: ${fadein} 2s; /* Opera */
`;

export const BannerContentMobile = styled(BannerContent)`
  width: 100%; 
  height: 100vh; 
  background-attachment: initial;
`;

export const SwitchLanguageButton = styled.a`
  position: fixed;
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: ${fontColorBanner};
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  top: 30px;
  right: 30px;
  overflow: hidden;
  z-index: 0;
  cursor: pointer;
  :after {
    content: '';
    position: absolute;
    display: table-cell;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(250, 250, 250, 0.1);
    border-radius: 10rem;
    z-index: -2;
  }
  :before {
    content: '';
    position: absolute;
    display: table-cell;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(250, 250, 250, 0.5);
    transition: all 0.3s;
    border-radius: 10rem;
    z-index: -1;
  }
  :hover {
    color: #000;
  }
  :hover:before {
    width: 100%;
  }

  @media (max-width: 768px) {
    :after {
      background-color: rgba(250, 250, 250, 0.0);
    }
    :hover {
      color: #fff;
    }
    :hover:before {
      width: 0;
    }
  }
`;

export const SwitchLanguageButtonMobile = styled(SwitchLanguageButton)`
  border-top-right-radius: 0px; 
  border-bottom-right-radius: 0px; 
  background-color: rgba(250, 250, 250, 0.4); 
  right: 0px; 
  top: 40px;
`;

export const CopyWrapper = styled.div`
  position: relative;
  width: 500px;
  margin-left: 10%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1200px) {
    max-width:400px;
  }
`;

const slideInRight = keyframes`
   to {
    transform:translateX(0);
  }
`;

const slideInLeft = keyframes`
   to {
    transform:translateX(-0%);
  }
`;

const slideInBottom = keyframes`
   to {
    transform:translateY(-0%);
  }
`;


export const Kicker = styled.h2`
  color: ${fontColorBanner};
  font-size: 40px;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  animation: 1s ${slideInRight} 0s forwards;
  transform:translateX(-100%);
  margin: 0;
`;

export const KickerMobile = styled(Kicker)`
  font-size: 20px; 
  margin-top: -10vh; 
  width: 80%; 
  margin-left: 10%; 
  text-align: center;
`;

export const Headline = styled.h1`
  color: ${fontColorBanner};
  font-family: 'Fira Code', monospace;
  font-weight: 400;
  font-size: 30px;
  margin-top: 2vh;
  animation: 1s ${slideInLeft} 0s forwards;
  transform:translateX(300%);
`;

export const HeadlineMobile = styled(Headline)`
  font-size: 15px; 
  width: 80%; 
  margin-left: 10%; 
  text-align: center; 
  line-height: 1.5;
`;

export const Description = styled.h3`
  color: ${fontColorBanner};
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  line-height: 1.4em;
  font-size: 20px;
  margin-top: 4vh;
  animation: 1s ${slideInBottom} 0s forwards;
  transform:translateY(300%);
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

export const DescriptionMobile = styled(Description)`
  width: 80%; 
  margin-left: 10%; 
  text-align: center;
`;

export const TeaserChevronContent = styled.div`
  position: absolute;
  left: 22%;
  top: 90vh;
  transform: translate(-50%, -50%);
`;

export const TeaserChevronContentMobile = styled(TeaserChevronContent)`
  width: 100px; 
  left: 50%; 
  top: 85%;
`;

export const AboutUsText = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
`;

const bounce = keyframes`
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
  }
`;

export const ScrollDownBtn = styled.div`
  margin: auto;
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid  rgba(250, 250, 250, 0.4);
  background-size: 14px auto;
  border-radius: 50%;
  z-index: 2;
  -webkit-animation: ${bounce} 2s infinite 2s;
  animation: ${bounce} 2s infinite 2s;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
  transform: scale(1);
  :before {
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 6px);
    transform: rotate(-45deg);
    display: block;
    width: 12px;
    height: 12px;
    content: "";
    border: 2px solid white;
    border-width: 0px 0 2px 2px;
  }
`;