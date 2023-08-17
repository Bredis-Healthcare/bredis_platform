import React, { useRef, useState } from 'react';
import { 
    RootContainer, Title, Contents, UploadBox, DragFile, 
    FileLabel, FileInput, FilesContainer, FileItem,
    Thumbnail, Details, Header, Progress, Status,
    ImageIcon, CloseButton, ModalContent, SubmitButton,
} from './FileUploadModalStyles';
import axios from "../api/axios";

function FileUploadModal( {orderId, isOpen, closeModal}) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileRef = useRef(null);

    const handleFiles = (files) => {
        const fileList = Array.from(files);
        setUploadedFiles([...uploadedFiles, ...fileList]);
    };

    const handleSubmit = (orderName) => {

        const upload = async () => {
            const formData = new FormData();
            Array.from(uploadedFiles).forEach((el) => {
              formData.append("file", el);
            });
        
            try {
              const response = await axios.post(`/orders/${orderId}/sample-data`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "boundary": "--boundary",
                },
              });
              alert("성공");
              console.log(response)
            } catch (error) {
              console.log("파일보내기 에러", error);
            }
          };

        upload();
        setUploadedFiles([]);
        closeModal();
    }

    if (!isOpen) return null;

    return (
        <RootContainer>
            
            <ModalContent>
                <CloseButton onClick={(e) => {
                    setUploadedFiles([]);
                    closeModal();
                }}>X</CloseButton>

                <Title>샘플 데이터 업로드</Title>
                <Contents>
                    <UploadBox>
                        <DragFile
                            onDragEnter={(e) => e.preventDefault()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                handleFiles(e.dataTransfer.files);
                            }}
                        >
                            <ImageIcon src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="File Icon" />
                            <p>파일을 드래그하여 업로드</p>
                        </DragFile>
                        <FileLabel htmlFor="chooseFile">파일 선택하기</FileLabel>
                        <FileInput 
                            id="chooseFile" 
                            type="file" 
                            multiple 
                            ref={fileRef}
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </UploadBox>
                    <FilesContainer>
                        {uploadedFiles.map((file, index) => (
                            <FileItem key={index}>
                                <Thumbnail>
                                    <ImageIcon src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="File type" />
                                </Thumbnail>
                                <Details>
                                    <Header>
                                        <span className="name">{file.name}</span>
                                        <span className="size">{(file.size / (1024 * 1024)).toFixed(2)} mb</span>
                                    </Header>
                                    <Progress>
                                        <div className="bar"></div>
                                    </Progress>
                                    <Status>
                                        <span className="percent">100% 완료</span>
                                        <span className="speed">90KB/sec</span>
                                    </Status>
                                </Details>
                            </FileItem>
                        ))}
                    </FilesContainer>
                </Contents>
                <SubmitButton onClick={handleSubmit} >업로드</SubmitButton>
            </ModalContent>
        </RootContainer>
    );
}

export default FileUploadModal;
