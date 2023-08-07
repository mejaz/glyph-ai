import {useState} from 'react';
import toast from "react-hot-toast";

export default function FileUpload({setOriginalImage, processing, setProcessing, setDataArr}) {
	const [file, setFile] = useState();

	const handleFileChange = (e) => {
		if (e.target.files) {
			let file = e.target.files[0]

			// if no file, just return
			if (!file) {
				return
			}

			// check if the uploaded file is an image
			if (!(file.type.startsWith('image/'))) {
				toast.error('Only image files are allowed')
				e.target.value = null
				return
			}

			const reader = new FileReader();
			reader.onload = () => {
				setFile(file);
				setOriginalImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	};

	const handleProcess = async () => {
		if (!file) {
			toast.error('No file to process')
			return;
		}

		setProcessing(true)
		const formData = new FormData();
		formData.append('file', file);

		// Uploading the file using the fetch API to the server
		let response = await fetch('/api/process', {
			method: 'POST',
			body: formData
		})
		if (response.ok) {
			response = await response.json()
			setDataArr(response.response)
			setProcessing(false)
		} else {
			response = await response.json()
			setProcessing(false)
			toast.error(response.message)
		}
	};

	return (
		<div className={"md:flex md:items-end md:space-x-2"}>
			<div className={'md:flex-grow'}>
				<label
					htmlFor="formFile"
					className="mb-2 inline-block text-neutral-700"
				>
					Upload an image file
				</label>
				<input
					accept="image/*"
					className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
					type="file"
					id="formFile"
					onChange={handleFileChange}
				/>
			</div>

			<div className={"my-4 md:my-0 md:flex-shrink-0"}>
				<button
					type="button"
					onClick={handleProcess}
					disabled={processing}
					className="w-full inline-block rounded bg-primary-main px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-dark hover:shadow-md focus:bg-primary-dark active:bg-primary-light disabled:bg-primary-light disabled:cursor-not-allowed">
					{processing ? 'Please wait...' : 'Process'}
				</button>
			</div>
		</div>
	)
}