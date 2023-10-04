import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Add any other styles you need */
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    margin-top: 10px;
    width: 100%;
    padding: 8px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Progress = styled.div`
  position: relative;
  height: 6px;
  background-color: #dbdbdb;
  overflow: hidden;
  margin-top: 4px;
  border-radius: 10px;

  .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #5b975b;
  }
`;


export const Status = styled.div`
  display: flex;
  width: 100%;

  .speed {
    margin-left: auto;
  }
  /* Add any other styles you need */
`;



export const RootContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
    width: 40%; // Adjust width as needed
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const UploadBox = styled.div`
  width: calc(50% - 15px);
  box-sizing: border-box;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 100%;
    margin-right: 0;
  }
`;
export const ImageIcon = styled.img`
  width: 40px;
`;

export const DragFile = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #dbdbdb;

  &.highlight {
    border: 3px dashed red;
  }

  .image {
    width: 40px;
  }

  .message {
    margin-bottom: 0;
  }

  @media (max-width: 700px) {
    height: 150px;
  }
`;

export const FileLabel = styled.label`
  margin-top: 30px;
  background-color: #5b975b;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  width: 65%;
  border-radius: 6px;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FilesContainer = styled.div`
  width: calc(50% - 15px);
  box-sizing: border-box;
  overflow: auto;
  height: 360px;

  .file:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }

  @media (max-width: 700px) {
    width: 100%;
    overflow: initial;
  }
`;


export const FileItem = styled.div`
  display: flex;
  padding: 20px 20px;
  border-bottom: 1px solid #dbdbdb;
`;

export const Thumbnail = styled.div`
  display: flex;
  flex: none;
  width: 50px;
  margin-right: 20px;
  align-items: center;

  .image {
    width: 100%;
  }
`;

export const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;

    .name {
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .size {
      margin-left: auto;
    }
  }

  .progress {
    position: relative;
    height: 6px;
    background-color: #dbdbdb;
    overflow: hidden;
    margin-top: 4px;
    border-radius: 10px;

    .bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #5b975b;
    }
  }

  .status {
    display: flex;
    width: 100%;

    .speed {
      margin-left: auto;
    }
  }
`;
