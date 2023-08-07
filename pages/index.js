import Head from "next/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useState} from "react";
import Intro from "@/components/Intro";
import FileUpload from "@/components/FileUpload";
import toast from "react-hot-toast";


export default function Home() {
	const [processing, setProcessing] = useState(false)
	const [originalImage, setOriginalImage] = useState("")
	const [dataArr, setDataArr] = useState([])

	const copyText = async() => {
		let data = dataArr.join("\n")
		await navigator.clipboard.writeText(data)
		toast.success("Text copied successfully!")
	}

	return (
		<main>
			<Head>
				<title>GlyphAI</title>
			</Head>
			<div className={'flex-grow'}>
				<Header/>
				<div className={'pt-24 h-[calc(100vh-65px)] overflow-auto'}>
					<div className={'max-w-5xl mx-auto'}>
						<div className={'grid grid-cols-1 lg:grid-cols-2 lg:gap-8 px-4'}>
							<div className={"col-span-1 lg:col-span-1"}>
								<Intro/>
								<FileUpload
									setProcessing={setProcessing}
									processing={processing}
									setOriginalImage={setOriginalImage}
									setDataArr={setDataArr}
								/>
								{originalImage && (
									<div className={'relative mt-6'}>
										<img
											src={originalImage}
											alt="newImage"
											style={{width: "100%", marginBottom: "10px"}}
										/>
									</div>
								)}
							</div>
							<div className={"col-span-1 lg:col-span-1 overflow-auto"}>
								<div className={"bg-rose-300 px-4 py-2 text-slate-700"}>Extracted text is below:</div>
								<div>
									{
										dataArr.length > 0
											? <div className={"bg-slate-200 px-4 py-6 relative h-[calc(100vh-230px)] overflow-auto"}>
												<button onClick={copyText} className={"absolute right-2 top-2 text-sm bg-white rounded-md px-2 py-1"}>Copy</button>
												{dataArr.map((text, index) => <div key={index}>{text}</div>)}
											</div>
											: <div className={"py-6 px-4"}>No data to display</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</main>
	);
}
