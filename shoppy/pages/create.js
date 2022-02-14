import Link from 'next/link';
import { useState } from 'react';
import { parseCookies } from 'nookies';
const Create = ({ categories }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [media, setMedia] = useState();
  const [description, setDescription] = useState();
  const [cid, setCid] = useState();
  const categoryList = categories.map((categorie) => {
    return (
      <div key={categorie._id}>
        <p>Available Categories </p>
        <p>
          Category Id:{categorie.cid} Category Name:
          {categorie.cname}
        </p>
      </div>
    );
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaurl = await imageUpload();
      //console.log(name, price, media, description);
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          price: price,
          mediaurl: mediaurl,
          description: description,
          cid: cid,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        M.toast({ html: res2.error, classes: 'red' });
      } else {
        M.toast({ html: 'Product saved', classes: 'green' });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'mystore');
    data.append('cloud', 'sriharsha242001');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/sriharsha242001/image/upload',
      { method: 'POST', body: data }
    );
    const res2 = await res.json();
    console.log(res2);
    return res2.url;
  };
  return (
    <>
      <form
        className="container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="number"
          min={'1'}
          max={'10'}
          maxLength="10"
          required
          placeholder="Product Category Id"
          onChange={(e) => {
            setCid(e.target.value);
          }}
        ></input>
        {categoryList}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input
              type="file"
              accept="image/"
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <img
          width="100px"
          height="100px"
          className="responsive-img"
          src={media ? URL.createObjectURL(media) : ''}
        />
        <textarea
          className="materialize-textarea"
          name="description"
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button className="btn waves-effect waves-light" type="submit">
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};
export default Create;
export async function getServerSideProps(context) {
  const cookie = parseCookies(context);
  const user = cookie.user ? JSON.parse(cookie.user) : '';
  if (user.role != 'admin') {
    const { res } = context;
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    const res = await fetch('http://localhost:3000/api/categories');
    const data = await res.json();
    return {
      props: { categories: data },
    };
  }
}
