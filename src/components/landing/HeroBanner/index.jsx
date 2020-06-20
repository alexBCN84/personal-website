import React from 'react';
import PropTypes from 'prop-types';

import { graphql, useStaticQuery } from 'gatsby';
import * as St from './styles';
import Img from 'gatsby-image';
import { useDevice } from "react-use-device";
import CVButton from './cvButton';
import { scrollTo } from '../../../utils';

export const HeroBanner = ({ languages, setLanguage }) => {
  const [inVewport, setInViewPort] = React.useState(null);
  const sectionRef = React.useRef(null);
  const SwitchLanguageButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (sectionRef.current) setInViewPort(true);
    const fixedPosition = 'fixed';
    const relativePosition = 'relative';

    SwitchLanguageButtonRef.current.style.position = fixedPosition;

    function toggleLanguageButtonPosition(entries) {
      // check if section is on view and is intersecting
      if (!entries[0].isIntersecting && !entries[0].isVisible) {
        SwitchLanguageButtonRef.current.style.position = relativePosition;
      } else {
        SwitchLanguageButtonRef.current.style.position = fixedPosition;
      }
    }

    // user rootMargin from options object to set the new point where you want intersection to happen
    const sectionObserver = new IntersectionObserver(toggleLanguageButtonPosition, { rootMargin: '-100px' });
    sectionObserver.observe(sectionRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, [inVewport, setInViewPort]);

  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 40, height: 40) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        allDataJson {
          edges {
            node {
              ES {
                kicker
                headline
                description
                aboutChevronText
                cvCTA {
                  text
                  href
                }
              }
              EN {
                kicker
                headline
                description
                aboutChevronText
                cvCTA {
                  text
                  href
                }
              }
            }
          }
        }
      }
    `
  );

  const { headline, kicker, description, cvCTA, aboutChevronText: about } = data.allDataJson.edges[0].node[
    languages.active
  ];

  const mobileHeroBanner = (
    <>
      <St.Wrapper ref={sectionRef}>
        <St.Teaser style={{width: '100%', backgroundPosition: 'center'}}>
          <St.LogoWrapper style={{marginLeft: -20}}>
            <Img fixed={data.file.childImageSharp.fixed} className="logo" alt="logo" />
            <St.LogoTextWrapper style={{marginLeft: 10}}>
              <St.Name style={{fontSize: 15}}>Alejandro Ginés</St.Name>
              <St.Title style={{fontSize: 12}}>Web Developer</St.Title>
            </St.LogoTextWrapper>
          </St.LogoWrapper>
          <CVButton href={cvCTA.href} >{cvCTA.text}</CVButton>
          <St.SwitchLanguageButton
            style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: "rgba(250, 250, 250, 0.4)", right: 0, top: 40}}
            ref={SwitchLanguageButtonRef}
            onClick={() => {
              const { inactive } = languages;
              const { active } = languages;
              setLanguage({ active: inactive, inactive: active });
            }}
          >
            {languages.inactive}
          </St.SwitchLanguageButton>
          <St.TeaserChevronContent href="#about" onClick={ () => scrollTo(document.getElementById('about'), 275, 'top') } style={{ width: '100px', left: '50%', top: '85%'}}>
            <St.AboutUsText>{about}</St.AboutUsText>
            <St.ScrollDownBtn />
          </St.TeaserChevronContent>
        </St.Teaser>
      </St.Wrapper>
      <St.BannerContent id="about" style={{ width: '100%', height: '100vh', backgroundAttachment: 'initial'}}>
        <St.Kicker style={{fontSize: 20, marginTop: '-10vh', width: '80%', marginLeft: '10%', textAlign: 'center'}} >{kicker}</St.Kicker>
        <St.Headline style={{fontSize: 15, width: '80%', marginLeft: '10%', textAlign: 'center', lineHeight: 1.5}}>{headline}</St.Headline>
        <St.Description style={{width: '80%', marginLeft: '10%', textAlign: 'center'}}>{description}</St.Description>
      </St.BannerContent>
    </>
  );

  const tabletHeroBanner = <p>Tablet Hero Banner</p>;

  const laptopHeroBanner = <p>Laptop Hero Banner</p>;

  const desktopHeroBanner = (
    <St.Wrapper ref={sectionRef}>
      <St.Teaser>
        <St.LogoWrapper>
          <Img fixed={data.file.childImageSharp.fixed} className="logo" alt="logo" />
          <St.LogoTextWrapper>
            <St.Name>Alejandro Ginés</St.Name>
            <St.Title>Web Developer</St.Title>
          </St.LogoTextWrapper>
        </St.LogoWrapper>
        <St.TeaserChevronContent href="about">
          <St.AboutUsText>{about}</St.AboutUsText>
          <St.ScrollDownBtn />
        </St.TeaserChevronContent>
      </St.Teaser>
      <St.BannerContent>
        <St.SwitchLanguageButton
          ref={SwitchLanguageButtonRef}
          onClick={() => {
            const { inactive } = languages;
            const { active } = languages;
            setLanguage({ active: inactive, inactive: active });
          }}
        >
          {languages.inactive}
        </St.SwitchLanguageButton>
        <St.CopyWrapper>
          <St.Kicker>{kicker}</St.Kicker>
          <St.Headline>{headline}</St.Headline>
          <St.Description>{description}</St.Description>
          <CVButton href={cvCTA.href}>{cvCTA.text}</CVButton>
        </St.CopyWrapper>
      </St.BannerContent>
      </St.Wrapper>
  );

  return (
    <>
      {isMOBILE && mobileHeroBanner}
      {isTABLET && tabletHeroBanner}
      {isLAPTOP && laptopHeroBanner}
      {isDESKTOP && desktopHeroBanner}
    </>
  )
};

HeroBanner.propTypes = {
  languages: PropTypes.shape({
    active: PropTypes.oneOf(['ES', 'EN']),
    inactive: PropTypes.oneOf(['ES', 'EN']),
  }).isRequired,
  setLanguage: PropTypes.func.isRequired,
};
