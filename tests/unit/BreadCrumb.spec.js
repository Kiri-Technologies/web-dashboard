import { mount } from "@vue/test-utils";

describe("BreadCrumb.vue", () => {
  it("renders breadcrumb based on array given", () => {
    const props = {
      crumbs: [
        {
          title: "Akun",
          link: {
            path: "/manageaccount",
          },
        },
        {
          title: "Tambah Akun",
          link: {
            path: "/manageaccount/create",
          },
        },
      ],
    };

    const breadCrumb = {
      props: ["crumbs"],
      template: ` <div class="text-sm breadcrumbs">
      <ul>
        <li v-for="(crumb, ci) in crumbs" :key="ci">
          <a :class="{ 'text-black': isLast(ci), 'text-gray-500': !isLast(ci) }" :href="crumb.link.path">{{ crumb.title }}</a>
        </li>
      </ul>
    </div>`,
      methods: {
        isLast(index) {
          return index === this.crumbs.length - 1;
        },
      },
    };

    const wrapper = mount(breadCrumb, {
      props,
    });

    expect(wrapper.find("a").exists()).toBe(true);
    expect(wrapper.find("li").exists()).toBe(true);
    expect(wrapper.html()).toContain('Akun');
    expect(wrapper.html()).toContain('Tambah Akun');
  });
});
