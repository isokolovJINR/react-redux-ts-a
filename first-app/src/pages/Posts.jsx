
import './styles/App.css';
import {useEffect, useId, useMemo, useRef, useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import {usePosts} from "./components/hooks/usePost";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function Posts() {
    const [posts, setPosts] = useState([
        {id: 2, title: 'JS', body: 'Js - Lang'},
        {id: 3, title: 'dd', body: 'Js - Lang'},
        {id: 4, title: 'sd', body: 'Js - Lang'}

    ]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);


    ///ДЗ заполнение через useMemo нужно реализовать
    // let pagesAaaaa = getPagesArray(totalPages);



    const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    useEffect(() => {
        fetchPosts();
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const deletePost = (post) => {
        setPosts([...posts.filter(p => p.id !==post.id)]);
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }

    return (
        <div className="App">
            <button
                onClick={fetchPosts}
            >
                GeT POSTS
            </button>
            <MyButton
                style={{marginTop: 30}}
                onClick={() => setModal(true)}
            >
                Создать пост
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
            <h1> Errors ${postError}</h1>
            }
            {isPostLoading
                ? <div style={{display: 'fles', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={deletePost} posts={sortedAndSearchPosts} title={'Список постов'}/>

            }

            <Pagination
                totalPages={totalPages}
                changePage={changePage}
                page={page}

            />

        </div>
    );
}

export default Posts;
