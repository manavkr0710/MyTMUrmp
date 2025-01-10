import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input, Box } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { BASE_URL } from "@/App";

const CreateUser = () => {
  const [items, setItems] = useState([]);
  const [subjectItems, setSubjectItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    subject: '',
    code: '',
    description: '',
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!inputs.name || !inputs.subject || !inputs.code || !inputs.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + 'api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create review');
      }
      alert('Review created successfully!');
      window.location.reload(); 
    } catch (error) {
      alert(`Error creating review: ${error.message}`);
      console.error('Error creating review:', error);
    } finally {
      setIsLoading(false);
      setInputs({
        name: '',
        subject: '',
        code: '',
        description: '',
      });
    }
  };

  const handleProfessorChange = (value) => {
    console.log("Selected professor:", value);
    import('../../../../backend/tmu_prof_scraper/professors_data.json')
      .then((module) => {
        const professors = module.default;
        console.log(`Total professors loaded: ${professors.length}`);
        const selectedProfessor = professors.find(professor => professor.name === value);
        if (selectedProfessor) {
          const subjects = selectedProfessor.subjects.map(subject => ({
            value: subject,
            label: subject,
          })).sort((a, b) => a.label.localeCompare(b.label));
          setSubjectItems(subjects);
          console.log(subjects);
        }
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  };

  const bufferCircle = () => {
    const progressCircle = document.getElementById('progress-circle');
    progressCircle.style.display = 'block';
    setTimeout(() => {
      progressCircle.style.display = 'none';
      const drawerCloseTrigger = document.querySelector('[data-drawer-close]');
      if (drawerCloseTrigger) {
        drawerCloseTrigger.click();
      }
    }, 1000);
  };

  useEffect(() => {
    import('../../../../backend/tmu_prof_scraper/professors_data.json')
      .then((module) => {
        const professors = module.default;

        const items = professors.map((professor, index) => ({
          value: professor.name,
          label: professor.name,
          key: `${professor.name}-${index}`,
        })).sort((a, b) => a.label.localeCompare(b.label));

        const subjects = [...new Set(professors.flatMap(professor => professor.subjects))];
        const subjectItems = subjects.map((subject, index) => ({
          value: subject,
          label: subject,
          key: `${subject}-${index}`,
        })).sort((a, b) => a.label.localeCompare(b.label));

        setItems(items);
        setSubjectItems(subjectItems);
        console.log(items);
        console.log(subjectItems);
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  }, []);

  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" bg="blue.500">
          <BiAddToQueue size={20} /> Add Review
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a Review</DrawerTitle>
        </DrawerHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          bufferCircle();
          handleCreateUser(e);
        }}>
          <DrawerBody>
            <DrawerTitle>Enter Professor Name</DrawerTitle>
            <NativeSelectRoot variant="subtle" size="sm" width="240px">
              <NativeSelectField
                placeholder="Select Professor"
                items={items}
                value={inputs.name}
                onChange={(e) => {
                  handleProfessorChange(e.target.value);
                  setInputs((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </NativeSelectRoot>
          </DrawerBody>
          <DrawerBody>
            <DrawerTitle>Enter Subject</DrawerTitle>
            <NativeSelectRoot variant="subtle" size="sm" width="240px">
              <NativeSelectField
                placeholder="Select Subject"
                items={subjectItems}
                value={inputs.subject}
                onChange={(e) => setInputs((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </NativeSelectRoot>
          </DrawerBody>
          <DrawerBody>
            <DrawerTitle>Enter Course Code</DrawerTitle>
            <Input
              placeholder="Course Code"
              value={inputs.code}
              onChange={(e) => setInputs((prev) => ({ ...prev, code: e.target.value }))}
            />
          </DrawerBody>
          <DrawerBody>
            <DrawerTitle>Enter Description</DrawerTitle>
            <Input
              placeholder="Description"
              as="textarea"
              resize="vertical"
              value={inputs.description}
              onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
            />
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure you want to create this review? You can't edit / delete reviews after creating.")) {
                  bufferCircle();
                  handleCreateUser(e);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
            <Box id="progress-circle" display="none" ml="10px">
              <ProgressCircleRoot value={null} size="sm">
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
            </Box>
          </DrawerFooter>
          <DrawerCloseTrigger data-drawer-close />
        </form>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CreateUser;