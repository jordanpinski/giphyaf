import React, { useEffect, useState, useContext } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { SkynetContext } from '../../state/SkynetContext';
import Avatar from '../Avatar';
import { LazyImage } from "react-lazy-images";
import { copySolid, loader } from '../../assets/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './Gif.css';

interface Props {
  skylinkUrl?: string
  tags?: string[]
  title?: string
}

const Gif: React.FC<Props> = ({
  skylinkUrl = '',
  tags = [],
  title = ''
}) => {
  
  // Local state
  const [copied, setCopied] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  // Global state
  // @ts-ignore
  const { mySky } = useContext(SkynetContext);
  const setSelectedGIF = useStoreActions((action: any) => action.setSelectedGIF);
  const { userProfile } = useStoreState((state: any) => state.mySky);

  useEffect(() => {
    setTimeout(() => { 
      setCopied(false);
    }, 1000);
  }, [copied])

  useEffect(() => {
    if (!userProfile) return;
    if (!userProfile.avatar[0].url) return;
    
    try {
      mySky.connector.client.getSkylinkUrl(userProfile.avatar[0].url).then((result: any) => {
        setAvatarUrl(result);
      });
    } catch (error) {
      console.log(error);
    }
  }, [userProfile]);

  const handleOnClick = () => {
    setSelectedGIF({
      skylinkUrl,
      tags,
      title
    })
  }

  const handleCopy = () => {
    setCopied(true);
  }

  return (
    <div className="gif fade-up">
      <a href="/" onClick={handleOnClick} title={title}>
        <div className="image">
          <LazyImage
            src={skylinkUrl}
            placeholder={({ imageProps, ref }) => (
              <div className="loading-overlay-section" ref={ref}>
                <object
                  className="fade-up"
                  type="image/svg+xml"
                  data={loader}
                  width="20px"
                  height="16px"
                >
                  Loading
                </object>
              </div>
            )}
            actual={({ imageProps }) => <img {...imageProps} alt="" />}
          />
        </div>
      </a>
      <div className="meta">
        <Avatar
          text={userProfile ? userProfile.username : null}
          width={34}
          height={34}
          src={avatarUrl}
          type={avatarUrl !== '' ? 'string' : 'object'}
        />
        <div className="right">
          <div>
            <p className="title">{title ? title : 'Title Here'}</p>
            <ul className="tags">
                {tags.map((tag: any, index: number) => {
                  return <li key={index}>#{tag}</li>
                })}
            </ul>
          </div>

          <CopyToClipboard onCopy={handleCopy} text={skylinkUrl}>
            <span className="copy" title="Copy URL">
              {copied ? <span className="copy-effect fade-up-down">Copied!</span> : null}
              <object className="fade-up" type="image/svg+xml" data={copySolid} width="20" height="18">Copy URL</object>
            </span>
          </CopyToClipboard>
          
        </div>
        
      </div>
    </div>
  )
}

export default Gif;