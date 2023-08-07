import formidable from 'formidable-serverless';
import fs from 'fs';
import textract from "@/aws-services";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	// 1. check if method is a POST call
	if (req.method === 'POST') {
		try {
			// 2. parse the form
			const form = new formidable.IncomingForm();
			form.parse(req, async (err, fields, files) => {
				if (err) {
					console.error('Error parsing form:', err);
					return res.status(500).json({error: 'Error parsing form'});
				}

				// 3. read the image file and assign the buffer to variable image
				const image = fs.readFileSync(files.file.path);
				const params = {
					Document: {
						Bytes: image,  // buffer
					},
				};
				try {
					// 4. call the textract api to get the texts
					const response = await textract.detectDocumentText(params).promise();
					const blocks = response.Blocks
					const textArr = blocks.filter(block => block.BlockType === "LINE").map(line => line.Text)
					return res.status(200).json({response: textArr})
				} catch (error) {
					console.error('Error detecting labels:', error.message);
					// 4. error detecting text
					return res.status(500).json({message: error.message});
				}
			});
		} catch (error) {
			console.error('Error:', error.message);
			res.status(500).json({message: error.message});
		}
	} else {
		// method not allowed
		res.status(405).json({error: 'Method not allowed'});
	}
}