<script>
    let newCourse = { name: "", description: "", price: Number };
    let editCourse = { id: '',name: "", description: "", price: Number };
    let courses = [];
    let size;
    let modalVis=false;


      // Fetch users from the server
    const fetchUsers = async () => {
        
        try {
          const response = await fetch('http://localhost:3001/getCourses');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          courses = await response.json();
          size = courses.length
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        
      };
      // Add a New user
    const addCourse = async () => {
        if (
            !newCourse.name.trim() ||
            !newCourse.description.trim()
        )
            return;
        try {
            const response = await fetch("http://localhost:3001/course/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newCourse.name,
                    description: newCourse.description,
                    price: Number(newCourse.price)
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            newCourse = { name: "", description: "", price: Number }; // Clear input fields
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
      // Update an existing user
    const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/course/update/${editCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editCourse.name,
            price: Number(editCourse.price),
            description: editCourse.description
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      editCourse = { id: '', name: '', description: '', price: Number };
      fetchUsers();
      modalVis=false;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
      //  Delete an Existing User
    const deleteUser = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/course/delete/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const startEdit = (course) => {
        modalVis=true
      editCourse = { id: course._id, name: course.name, description: course.description, price: course.price };
      
    };
    function endUpdate(){
        modalVis=false;
    }

fetchUsers();

</script>

<section class="bg-white">
    <div class="mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Information</h2>
      </div>
  
      <div class="mt-8 w-full sm:mt-12  max-w-[200px]">
          <div class="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Courses</dt>
  
            <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">{size}</dd>
          </div>
      </div>
    </div>
  </section>

{#if modalVis}
<section class=" w-full  fixed top-0 items-center bg-emerald-100 z-50 text-center rounded-3xl shadow-2xl">
    <div class="flex flex-col max-w-[690px] m-auto   items-center justify-center p-5 text-center sm:p-12">
      <h2 class="mt-6 text-3xl font-bold">Edit Course</h2>
      <form action="" class=" w-full mb-0 mt-8  space-y-4">
        <div>
            <label for="Name" class="sr-only">Name</label>

            <div class="relative">
                <input
                    type="Name"
                    bind:value={editCourse.name}
                    class="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Course Name"
                />
            </div>
        </div>

        <div>
            <label for="Price" class="sr-only">Price</label>

            <div class="relative">
                <input
                    type="number"
                    bind:value={editCourse.price}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cource Price in Ponds"
                />
            </div>
        </div>
        <div>
            <label for="desc" class="sr-only">Description</label>

            <div class="relative">
                <textarea
                    rows="4"
                    bind:value={editCourse.description}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Description"
                />
            </div>
        </div>

        <div>
        </div>
    </form>
    </div>
    <button type="button" 
    on:click={updateUser}
    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
    <button 
    type="button" 
    on:click={endUpdate}
    class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
</section>
{/if}



<div class="mx-auto max-w-[680px] px-3 py-8 sm:px-6 lg:px-8 border-4 bg-[#e6e6fa] ">
    <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Add Course</h1>
        
        <p class="mt-4 text-gray-500">Description</p>
    </div>

    <form action="" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
            <label for="Name" class="sr-only">Name</label>

            <div class="relative">
                <input
                    type="Name"
                    bind:value={newCourse.name}
                    class="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Course Name"
                />
            </div>
        </div>

        <div>
            <label for="Price" class="sr-only">Price</label>

            <div class="relative">
                <input
                    type="number"
                    bind:value={newCourse.price}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cource Price in Ponds"
                />
            </div>
        </div>
        <div>
            <label for="desc" class="sr-only">Description</label>

            <div class="relative">
                <textarea
                    rows="4"
                    bind:value={newCourse.description}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Description"
                />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <button
                    type="submit"
                    class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    on:click={addCourse}
                >
                    Add Course
                </button>
            </div>
        </div>
    </form>
</div>





<div class="w-full flex flex-col px-6" >
    <h1 class="font-bold font-sans " >List of Courses</h1>

    {#each courses as course}
    <div class="flow-root mb-[2.75rem]">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Name</dt>
                <dd class="text-gray-700 sm:col-span-2">{course.name}</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Price</dt>
                <dd class="text-gray-700 sm:col-span-2">£{course.price}</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Age Group</dt>
                <dd class="text-gray-700 sm:col-span-2">55</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Duration</dt>
                <dd class="text-gray-700 sm:col-span-2">6 months</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Start Date</dt>
                <dd class="text-gray-700 sm:col-span-2">dd mm yyyy</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">End Date</dt>
                <dd class="text-gray-700 sm:col-span-2">dd mm yyyy</dd>
            </div>

            <div
                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
                <dt class="font-medium text-gray-900">Description</dt>
                <dd class="text-gray-700 sm:col-span-2 break-words ">
                    {course.description}
                </dd>
            </div>
        </dl>
        <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
            <button
              class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Edit Product"
              on:click={()=>startEdit(course)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          
            <button
              class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
              title="Delete Product"
              on:click={()=>deleteUser(course._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
        </span>


    </div>
    {/each}
    

  </div>

  
