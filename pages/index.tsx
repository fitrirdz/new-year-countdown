import Head from 'next/head';
import Image from 'next/image';
import imgSrc from '../public/island.png';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function Home() {
  // Set the date we're counting down to
  const nextYear = new Date().getFullYear() + 1;

  const targetDate = new Date(`Jan 1, ${nextYear} 00:00:00`).getTime();
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isNewYear: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isNewYear: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const currentHour = useMemo(() => {
    return 24 - timeLeft.hours;
  }, [timeLeft.hours]);
  const starStyling = useMemo(() => {
    if (currentHour > 5 && currentHour < 18) {
      return { display: 'none' };
    } else if (currentHour >= 18 && currentHour <= 24) {
      return { opacity: currentHour / 24 };
    } else {
      return { opacity: (100 - 16.67 * currentHour) / 100 };
    }
  }, [currentHour]);
  const waveStyling = {
    background: `url(/wave.png)`,
    backgroundSize: '1000px 100px',
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [calculateTimeLeft]);

  useEffect(() => {
    const { isNewYear } = timeLeft;
    if (isNewYear) {
      document.title = `Welcome to ${nextYear}!`;
    }
  }, [timeLeft, nextYear]);

  return isClient ? (
    <>
      <Head>
        <title>Countdown to {nextYear}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/fireworks.ico' />
      </Head>

      <main
        className={
          currentHour < 10
            ? `sky-gradient-0${currentHour}`
            : `sky-gradient-${currentHour}`
        }
      >
        <div
          id='firework1'
          className={timeLeft.isNewYear ? 'firework' : ''}
        ></div>
        <div
          id='firework2'
          className={timeLeft.isNewYear ? 'firework' : ''}
        ></div>
        <div
          id='firework3'
          className={timeLeft.isNewYear ? 'firework' : ''}
        ></div>
        <section>
          <div className='container'>
            <div id='scene'>
              <div className='layer'>
                <h2 id='timer'>
                  {timeLeft.isNewYear ? (
                    <>
                      HAPPY NEW YEAR
                      <br />
                      {nextYear}
                    </>
                  ) : (
                    <>
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                      {timeLeft.seconds}s
                    </>
                  )}
                </h2>
                <div id='stars' style={starStyling} />
                <Image
                  width={1000}
                  height={1000}
                  src={imgSrc}
                  alt='island'
                  id='island'
                  style={{
                    filter:
                      currentHour < 13
                        ? `brightness(${currentHour * 8.3 + 22.7}%)`
                        : `brightness(${(24 - currentHour) * 8.3 + 22.7}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <div
          className='waves'
          id='waves'
          style={{
            filter:
              currentHour < 13
                ? `brightness(${currentHour * 8.3 + 22.7}%)`
                : `brightness(${(24 - currentHour) * 8.3 + 22.7}%)`,
          }}
        >
          <div className='wave' id='wave1' style={waveStyling} />
          <div className='wave' id='wave2' style={waveStyling} />
          <div className='wave' id='wave3' style={waveStyling} />
          <div className='wave' id='wave4' style={waveStyling} />
        </div>
      </main>
    </>
  ) : null;
}
