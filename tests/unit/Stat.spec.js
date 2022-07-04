import { mount } from "@vue/test-utils";
import SingleStat from "@/components/atoms/chart/SingleStat.vue";

describe("BaseStatCard.vue", () => {
  it("renders base statistic card", () => {
    const props = {
      title: "Jumlah user",
      data: 10,
    };

    const BaseStatCard = {
      props: ["title", "data"],
      template: `<div class="card bg-white">
            <div class="card-body">
            <div class="grid grid-flow-row auto-rows-auto">
            <div
              class="
                bg-gray-200
                text-center
                py-1
                rounded-md
                text-gray-600
                font-bold
              "
            >
              {{ title }}
            </div>
            <div class="font-bold text-5xl py-4 text-center text-kiri-green" style="color: #39ac00">
              {{ data }}
            </div>
          </div>
            </div>
        </div>`,
    };

    const wrapper = mount(BaseStatCard, {
      props,
    });

    expect(wrapper.html()).toContain("Jumlah user");
    expect(wrapper.html()).toContain("10");
  });
});
describe("SingleStat.vue", () => {
  it("renders single stat", () => {
    const props = {
      title: "Submitted",
      value: 15,
    };
    const wrapper = mount(SingleStat, {
      props,
    });

    expect(wrapper.html()).toContain("Submitted");
    expect(wrapper.html()).toContain("15");
  });
});
