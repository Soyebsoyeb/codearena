import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Target, ExternalLink, Star, Cpu, Trophy, Search } from 'lucide-react';

const platforms = [
  { id: 'codeforces', name: 'Codeforces', icon: '🔵', color: 'bg-blue-500/20' },
  { id: 'leetcode', name: 'LeetCode', icon: '🟡', color: 'bg-yellow-500/20' },
  { id: 'codechef', name: 'CodeChef', icon: '🟤', color: 'bg-amber-500/20' },
  { id: 'gfg', name: 'GeeksforGeeks', icon: '🟢', color: 'bg-green-500/20' },
  { id: 'atcoder', name: 'AtCoder', icon: '🔴', color: 'bg-red-500/20' },
  { id: 'hackerrank', name: 'HackerRank', icon: '🟢', color: 'bg-emerald-500/20' },
];

const topics = [
  'Dynamic Programming', 'Graph Algorithms', 'Tree Algorithms', 'Data Structures',
  'Greedy Algorithms', 'Binary Search', 'Sorting', 'String Algorithms',
  'Number Theory', 'Combinatorics', 'Geometry', 'Bit Manipulation',
  'Two Pointers', 'Sliding Window', 'Backtracking', 'Divide and Conquer'
];

const difficultyLabels = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];

const sampleQuestions = {
  codeforces: [
    { title: "Two Sum", url: "https://codeforces.com/problem/1/A", difficulty: 1 },
    { title: "Dynamic Programming Problem", url: "https://codeforces.com/problem/898/F", difficulty: 4 },
    { title: "Graph Traversal", url: "https://codeforces.com/problem/580/C", difficulty: 3 },
  ],
  leetcode: [
    { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: 1 },
    { title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: 3 },
    { title: "Binary Tree Traversal", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: 2 },
  ],
  codechef: [
    { title: "Chef and Numbers", url: "https://www.codechef.com/problems/FLOW001", difficulty: 1 },
    { title: "Tree Algorithms", url: "https://www.codechef.com/problems/TREE01", difficulty: 4 },
    { title: "Array Problems", url: "https://www.codechef.com/problems/MAXSC", difficulty: 2 },
  ],
  gfg: [
    { title: "Introduction to Arrays", url: "https://practice.geeksforgeeks.org/problems/sum-of-array-elements", difficulty: 1 },
    { title: "Graph Algorithms", url: "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph", difficulty: 3 },
    { title: "Dynamic Programming", url: "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem", difficulty: 4 },
  ]
};

const Index = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState([2]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const generateRecommendation = () => {
    if (!selectedPlatform) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const platformQuestions = sampleQuestions[selectedPlatform as keyof typeof sampleQuestions] || [];
      const filteredQuestions = platformQuestions.filter(q => q.difficulty === difficulty[0]);
      const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)] || platformQuestions[0];
      
      setRecommendation({
        ...randomQuestion,
        platform: platforms.find(p => p.id === selectedPlatform),
        topics: selectedTopics,
        difficulty: difficultyLabels[difficulty[0]]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-pulse-glow">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Find Your Perfect Challenge</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-float">
              CodeQuest
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover coding problems tailored to your skill level and interests. 
              Get personalized recommendations from top competitive programming platforms.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span>Difficulty Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Topic Filtering</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Multi-Platform</span>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-0 shadow-2xl animate-scale-in">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Find Your Next Challenge</CardTitle>
                <CardDescription>
                  Configure your preferences to get the perfect coding problem recommendation
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Platform Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Choose Platform</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        variant={selectedPlatform === platform.id ? "chip-active" : "chip"}
                        className="h-16 flex-col gap-2 hover-glow transition-smooth"
                        onClick={() => setSelectedPlatform(platform.id)}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="text-xs font-medium">{platform.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Rating */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Difficulty Level</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      {difficultyLabels.map((label, index) => (
                        <span key={index} className={difficulty[0] === index ? 'text-primary font-medium' : ''}>
                          {label}
                        </span>
                      ))}
                    </div>
                    
                    <Slider
                      value={difficulty}
                      onValueChange={setDifficulty}
                      max={4}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    
                    <div className="text-center">
                      <Badge variant="secondary" className="px-4 py-2">
                        Current: {difficultyLabels[difficulty[0]]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Topics Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Select Topics</h3>
                    <Badge variant="outline" className="ml-auto">
                      {selectedTopics.length} selected
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {topics.map((topic) => (
                      <Button
                        key={topic}
                        variant={selectedTopics.includes(topic) ? "chip-active" : "chip"}
                        size="sm"
                        className="justify-start text-left h-10"
                        onClick={() => toggleTopic(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-6">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold animate-pulse-glow"
                    onClick={generateRecommendation}
                    disabled={!selectedPlatform || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Generating Recommendation...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Find Perfect Question
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation Result */}
            {recommendation && (
              <Card className="mt-8 glass-effect border-0 shadow-2xl animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{recommendation.title}</h3>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {recommendation.platform?.icon}
                          {recommendation.platform?.name}
                        </Badge>
                        <Badge variant="secondary">
                          {recommendation.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="gradient"
                      className="hover-scale"
                      onClick={() => window.open(recommendation.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Solve Now
                    </Button>
                  </div>
                  
                  {recommendation.topics.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Related Topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.topics.map((topic: string) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;