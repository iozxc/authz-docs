---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const coreMembers = [{
    avatar: 'https://q.qlogo.cn/g?b=qq&nk=1269670415&s=100',
    name: '周鑫晨',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/iozxc' }
    ]
  }]
const partners = [{
    avatar: 'https://q.qlogo.cn/g?b=qq&nk=2041085572&s=100',
    name: '苏友鹏',
    title: 'partner'
  }]
</script>

<VPTeamPage>
  <h3 class='header'>团队</h3>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<style>
.header{
    margin: 30px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
}
img{
  -webkit-user-drag: none;
}
</style>