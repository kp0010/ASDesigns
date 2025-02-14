import { useAuth } from "@clerk/clerk-react";

export const UploadFiles = () => {
	const { getToken } = useAuth()

	const uploadFiles = async (event) => {
		event.preventDefault()

		const token = await getToken()

		const formData = new FormData()
		formData.append("folderName", "NEW")

		const files = event.target.files

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i])
		}

		fetch("http://localhost:8080/api/products", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, },
			body: formData,
		})
			.then((resp) => resp.json())
			.then((data) => {
				// TODO: Error Handling
			});
	};


	const deleteProduct = async (event) => {
		event.preventDefault()

		const token = await getToken()

		fetch("http://localhost:8080/api/products", {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ productId: "PRODUCT_NAME" })
		})
			.then((resp) => resp.json())
			.then((data) => console.log(data))
	}

	return (
		<>
			<input type="file" multiple onChange={uploadFiles} />
			<button onClick={deleteProduct}>DELETE</button>
		</>
	)

}
