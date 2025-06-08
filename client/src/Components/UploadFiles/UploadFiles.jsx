import { useAuth } from "@clerk/clerk-react";

export const UploadFiles = () => {
	const { getToken } = useAuth()

	const uploadFiles = async (event) => {
		event.preventDefault()

		const token = await getToken()

		const formData = new FormData()
		formData.append("folderName", "BITCH")

		const files = event.target.files

		files.forEach(file => formData.append("files", file))

		fetch("/api/products", {
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

		fetch(`/api/products/${productId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
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
