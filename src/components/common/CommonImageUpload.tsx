import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Modal, Text, useMantineTheme } from "@mantine/core";
// import { IconCloudUpload, IconEye, IconUpload, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { handleImageCompression } from "@/utils/helpers/imageCompression";
import { CloudUpload, X } from "lucide-react";

const ImageUpload = ({
    control,
    setValue,
    errors,
    getValues,
    value,
    handleLoading,
    final,
    index,
    rules,
    keys,
}: any) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadCoverImg, setUploadCoverImg] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [imgSrc, setImgSrc] = useState<any>();
    const [croppedImage, setCroppedImage] = useState<string | Blob>("");

    const uploadImage = async () => {
        const appId: any = process.env.NEXT_PUBLIC_IMAGE_APP_ID;
        const fileType: any = process.env.NEXT_PUBLIC_IMAGE_FILE_TYPE;
        console.log(croppedImage, "cropped");
        const file: any = await handleImageCompression(croppedImage);
        let formData = new FormData();
        formData.append("appId", appId);
        formData.append("fileType", fileType);
        formData.append("userId", "1");
        formData.append("image", file);
        setIsLoading(true);
        setInvalid(false);
        fetch("https://image.ktmbees.com/storeImage", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                const respJson = res.json();
                setIsLoading(false);
                return respJson;
            })
            .then((res) => {
                if (keys) {
                    setValue(`${final}.${index}.${keys}`, res.Location);
                } else {
                    setValue(value, res?.Location);
                }
                setUploadCoverImg(res?.Location);
                handleLoading(false);
            })
            .catch(() => {
                // TODO: Update ui and states with error....
            });
    };

    useEffect(() => {
        if (croppedImage) {
            uploadImage();
        }
    }, [croppedImage]);

    return (
        <>
            <div>
                <Controller
                    name={value}
                    control={control}
                    rules={
                        rules || {
                            required: "Required",
                        }
                    }
                    defaultValue={""}
                    render={() => (
                        <Dropzone
                            loading={isLoading}
                            onDrop={(files) => {
                                handleLoading(true);
                                setImgSrc(URL.createObjectURL(files[0]));
                            }}
                            onReject={() => setInvalid(true)}
                            // maxSize={1 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            <Group
                                style={{
                                    minHeight: 220,
                                    pointerEvents: "none",
                                }}
                            >
                                <Dropzone.Accept>
                                    <CloudUpload size={50} color="#6E7191" />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <X size={50} color="red" />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <div></div>
                                    <CloudUpload size={50} color="#6E7191" />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline color="#6E7191">
                                        Drag image here or click to select file
                                    </Text>
                                    {/* <Text size="sm" color="dimmed" inline mt={7}>
                    File should not exceed 1 mB
                  </Text> */}
                                </div>
                            </Group>
                        </Dropzone>
                    )}
                />
            </div>
            {!!keys &&
                !uploadCoverImg &&
                !!errors &&
                errors[final] &&
                errors[final][index] && (
                    <div className={"text-red-500 pt-2"}>
                        Image is required *
                    </div>
                )}
            {invalid && (
                <div className={"text-primary pt-2"}>
                    Invalid image format !!
                </div>
            )}
            {/*{console.log(errors['achievements'], value, errors[])}*/}
            {!keys && !uploadCoverImg && errors[value] && (
                <div className={"text-red-500 pt-2"}>Image is required *</div>
            )}
            {!keys && getValues(value) && (
                <div
                    className={"pt-4 relative"}
                    style={{
                        height: "100px",
                        width: "100px",
                    }}
                >
                    <div
                        className={
                            " flex flex-col items-center  absolute top-11 left-7 "
                        }
                    >
                        <div>{/* <IconEye size={40} stroke={1.5} /> */}</div>
                    </div>

                    <Image
                        src={getValues(value)}
                        alt={"product-image"}
                        loading={"lazy"}
                        height={"200"}
                        width={"200"}
                        onClick={() => setOpened(!opened)}
                        className={
                            "cursor-pointer hover:opacity-70  hover:transition hover:ease-in "
                        }
                    />
                </div>
            )}
            {!!keys &&
                getValues(final) &&
                getValues(final)[index] &&
                getValues(final)[index][keys] && (
                    <div className={"pt-4 relative"}>
                        <div
                            className={
                                " flex flex-col items-center absolute top-12 left-8 hover:z-50 "
                            }
                        >
                            <div>
                                {/* <IconEye size={40} stroke={1.5} /> */}
                            </div>
                        </div>
                        <Image
                            src={getValues(`${final}.${index}.${keys}`)}
                            alt={"certification-image"}
                            loading={"lazy"}
                            height={"100"}
                            width={"100"}
                            onClick={() => setOpened(!opened)}
                            className={
                                "cursor-pointer hover:opacity-70  hover:transition hover:ease-in"
                            }
                        />
                    </div>
                )}
            {!keys && getValues(value) && (
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    centered
                    size={"xl"}
                >
                    <Image
                        src={getValues(value)}
                        alt={"certification-image"}
                        height={1024}
                        width={1024}
                    />
                </Modal>
            )}
            {!!keys && getValues(value) && (
                // getValues(value)[index] &&
                // getValues(value)[index][keys] &&
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    centered
                >
                    <div className="w-full h-full">
                        <Image
                            src={getValues(`${final}.${index}.${keys}`)}
                            alt={"certification-image"}
                            className="w-full h-full"
                            height={1024}
                            width={1024}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ImageUpload;
