const fs = require('fs');
const path = require('path');

// Read the template file
const templateContent = fs.readFileSync('template.jsx', 'utf8');

// Define the files you want to create and their content
const componentsToCreate = [
  { name: 'ONTFORM6', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM6') },
  { name: 'ONTFORM8', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM8') },
  { name: 'ONTFORM14', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM14') },
  { name: 'ONTFORM15', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM15') },
  { name: 'ONTFORM23', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM23') },
  { name: 'ONTFORM25', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM25') },
  { name: 'ONTFORM36', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM36') },
  { name: 'ONTFORM10A', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM10A') },
  { name: 'ONTFORM14A', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM14A') },
  { name: 'ONTFORM14B', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM14B') },
  { name: 'ONTFORM14C ', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM14C') },
  { name: 'ONTFORM15B', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM15B') },
  { name: 'ONTFORM15C', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM15C') },
  { name: 'ONTFORM17A', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM17A') },
  { name: 'ONTFORM17C', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM17C') },
  { name: 'ONTFORM17E', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM17E') },
  { name: 'ONTFORM25A', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM25A') },
  { name: 'ONTFORM26B', content: templateContent.replace(/__COMPONENT_NAME__/g, 'ONTFORM26B') },
  // Add more files as needed
];
// Function to create a component file
const createComponent = (componentName, componentContent) => {
    const filePath = `src/components/Formpages/forms/ontario/${componentName}.jsx`;
    const dir = path.dirname(filePath);
  
    // Ensure the directory exists
    fs.mkdirSync(dir, { recursive: true });
  
    // Write the file
    fs.writeFileSync(filePath, componentContent, 'utf8');
    console.log(`Created component: ${componentName}`);
  };
  
  // Loop through the components and create them
  componentsToCreate.forEach(component => {
    createComponent(component.name, component.content);
  });
  
  console.log('All components created successfully!');