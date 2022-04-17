import React from 'react';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import {
  faHeart,
  faBars,
  faDoorOpen,
  faRightFromBracket,
  faPersonThroughWindow,
  faArrowTurnUp,
  faAddressBook,
  faHome,
  faComment,
  faCommentAlt,
  faCircleInfo,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar({ signedIn }) {
  const router = useRouter();

  const MenuItem = ({ label, direct = '', icon = null }) => (
    <button
      className='group flex items-center text-white hover:text-bsPink2 transition-all duration-200 hover:scale-110'
      onClick={() => router.push(`/${direct}`)}
    >
      {icon && <FontAwesomeIcon icon={icon} />}&nbsp;
      <p className='opacity-0 group-hover:opacity-100 '>{label}&nbsp;</p>
    </button>
  );

  return (
    <>
      <nav className='bg-bsBlue flex flex-col content-center items-center md:flex-row justify-between py-5 px-4'>
        <div className='flex gap-5 flex-col md:flex-row'>
          <a className='flex gap-2 mr-5 items-center text-white'>
            <FontAwesomeIcon icon={faHeart} className='text-bsPink1 text-3xl' />
            <span
              className='text-2xl cursor-pointer'
              onClick={() => router.push('/')}
            >
              Binary Search
            </span>
          </a>
          <div className='flex gap-6' id='mobile-menu'>
            <MenuItem label='Home' icon={faHome} iconPos='l' />
            <MenuItem label='About' direct='about' icon={faCircleInfo} />
          </div>
        </div>

        <div>
          {!signedIn ? (
            <div className='flex flex-col md:flex-row items-center'>
              <button
                className='btn-pink m-3 font-bold'
                onClick={() => router.push('/signin')}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className='text-white'
                />
                &nbsp; Sign In
              </button>
              <button
                className='btn-blue font-bold'
                onClick={() => router.push('/register')}
              >
                <FontAwesomeIcon icon={faDoorOpen} className='text-white' />
                &nbsp; Register
              </button>
            </div>
          ) : (
            <div className='flex gap-4'>
              <MenuItem label='Chat' direct='chat' icon={faCommentAlt} />
              <MenuItem label='Project' direct='project' icon={faCode} />
              <MenuItem label='Profile' direct='profile' icon={faAddressBook} />
              <button
                className='btn bg-purple-700 hover:bg-purple-800 font-bold'
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faArrowTurnUp} className='text-white' />
                &nbsp; Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  const user = userEmail !== undefined ? await getUserByEmail(userEmail) : null;

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  return {
    props: { pageProps: { session, notConfirmed: !user } }, // will be passed to the page component as props
  };
}
