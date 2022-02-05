/** components |  StudentPage | Page
* @description: A page that displays all students, and allows the user to filter by name.
	@redux: search/searchSlice
	@store: loading, students
	@reducers: searchTerm, searchField
  @state: loadedStudents([]), isLoaded(false)
	@components: [Student]List, SearchBar
	@elements: main, student portal, search bar, list of students
*/

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {List} from '../../components/List'
import {SearchBar} from '../search/SearchBar'

export const StudentPage = () => {
	const [loadedStudents, setLoadedStudents] = useState([])
	const [isLoaded, setLoaded] = useState(false)
	const {studentList: {students}} = useSelector((state) => state.reducer.students)

	const {searchTerms} = useSelector((state) => state.reducer.search)
	const nameQuery = searchTerms.name.query
	const tagQuery = searchTerms.tags.query

	useEffect(
		() => {
			if (students) {
				setLoaded(true)
				setLoadedStudents(students)
			}
			if (isLoaded && nameQuery) {
				setLoadedStudents(
					students.filter((student) => student.name.toLowerCase().includes(nameQuery.toLowerCase()))
				)
			}
			if (isLoaded && tagQuery) {
				setLoadedStudents(
					students.filter((student) =>
						student.tags.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
					)
				)
			}
			if (isLoaded && nameQuery && tagQuery) {
				setLoadedStudents(
					students.filter(
						(student) =>
							student.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
							student.tags.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
					)
				)
			}
		},
		[isLoaded, nameQuery, students, tagQuery]
	)

	return (
		<section className='bg-white w-full h-full pb-24 md:w-4/5 md:h-3/4 rounded-lg shadow-md overflow-hidden relative'>
			<nav className='min-w-full sticky z-10 top-0 pb-2'>
				<SearchBar field='tags' />
				<SearchBar field='name' />
			</nav>
			{isLoaded ? <List list={loadedStudents} type='students' /> : <List list={loadedStudents} type='loader' />}
		</section>
	)
}
