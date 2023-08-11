import React, { useRef, useState } from 'react';
import { 
    RootContainer, Title, Contents, UploadBox, DragFile, 
    FileLabel, FileInput, FilesContainer, FileItem,
    Thumbnail, Details, Header, Progress, Status,
    ImageIcon, CloseButton, ModalContent, SubmitButton,
} from './FileUploadModalStyles';
import axios from "../api/axios";

function FileUploadModal( {isOpen, closeModal}) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileRef = useRef(null);

    const handleFiles = (files) => {
        const fileList = Array.from(files);
        setUploadedFiles([...uploadedFiles, ...fileList]);
    };

    const handleSubmit = (orderName) => {
        async function Upload() {
            try {
                // const request = await axios.post('/messages/new-thread', 
                // {
                //     "memberId": userId,
                //     "content": detail
                // });
                console.log("Data Upload");

            } catch (error) {
                console.error("Error while Uploading in:", error);
            }
        }

        Upload();
        closeModal();
    }

    if (!isOpen) return null;

    return (
        <RootContainer>
            
            <ModalContent>
                <CloseButton onClick={closeModal}>X</CloseButton>

                <Title>File Upload</Title>
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
                            <p>Drag files to upload</p>
                        </DragFile>
                        <FileLabel htmlFor="chooseFile">Choose File</FileLabel>
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
                                        <span className="percent">100% done</span>
                                        <span className="speed">90KB/sec</span>
                                    </Status>
                                </Details>
                            </FileItem>
                        ))}
                    </FilesContainer>
                </Contents>
                <SubmitButton onClick={handleSubmit} >Submit</SubmitButton>
            </ModalContent>
        </RootContainer>
    );
}

export default FileUploadModal;
