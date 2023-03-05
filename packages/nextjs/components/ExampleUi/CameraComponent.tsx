import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Camera, CameraType } from "react-camera-pro";
import Modal from "../Modal";
import Mint from "./Mint";
import Image from "next/image"; // for Next.js
import spork from "../../public/assets/spork.png";
import { useStorage } from "./Web3StorageProvider";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;

  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;

  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  background: url("https://img.icons8.com/ios/50/000000/compact-camera.png");
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`;

const ImagePreview = styled.div<{ image: string | null }>`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : "")}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;

const CameraComponent = () => {
  const { storeFiles, storeJson } = useStorage();
  const [file, setFile] = useState<File | null>(null);

  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(i => i.kind == "videoinput");
      setDevices(videoDevices);
    })();
  });

  const handleTakePhoto = async () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);

      setShowModal(true);
      const blob = await (await fetch(photo)).blob();
      const photoFile = new File([blob], "photo.jpg");

      const URI = await storeFiles(photoFile);
      // Upload photo to web3.storage
      console.log(`Photo uploaded to web3.storage with CID: ${URI}`);

      // Call any additional code you want here
    }
  };
  function handleExit() {
    setImage(null);
    setShowModal(false);
  }

  return (
    <Wrapper>
      {showModal ? (
        <div id="modal-mint">
          <Modal onClose={handleExit} show={showModal} title="mint">
            <div className="pt-10">
              <center>
                <Image src={spork} alt="Spork Castle NFT" width={300} height={300} />
              </center>
            </div>

            <div className="pt-5">
              <h1 className="text-center text-2xl font-bold"> SPORK CASTLE </h1>
              <h3 className="text-center text-lg "> 0xAddress </h3>
              <h4 className="text-center text-lg "> 4655 Humboldt St, Denver CO 80216 </h4>
            </div>

            <div className="pt-5">
              <center>
                <Mint />
              </center>
            </div>
          </Modal>
        </div>
      ) : (
        <Camera
          ref={camera}
          aspectRatio="cover"
          numberOfCamerasCallback={i => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          errorMessages={{
            noCameraAccessible: "No camera device accessible. Please connect your camera or try a different browser.",
            permissionDenied: "Permission denied. Please refresh and give camera permission.",
            switchCamera:
              "It is not possible to switch camera to different one because there is only one video device accessible.",
            canvas: "Canvas is not supported.",
          }}
        />
      )}

      <Control>
        <select
          onChange={event => {
            setActiveDeviceId(event.target.value);
          }}
        >
          {devices.map(d => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))}
        </select>

        <ImagePreview
          image={image}
          onClick={() => {
            setShowImage(!showImage);
          }}
        />

        <TakePhotoButton onClick={handleTakePhoto} />

        <ChangeFacingCameraButton
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        />
      </Control>
    </Wrapper>
  );
};

export default CameraComponent;
