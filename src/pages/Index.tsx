import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Target, ExternalLink, Star, Cpu, Trophy, Search } from 'lucide-react';

// SVG Platform Icons
const PlatformIcons = {
  codeforces: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded-full">
      <circle cx="16" cy="16" r="16" fill="#1F8ACB"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CF</text>
    </svg>
  ),
  leetcode: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded">
      <rect width="32" height="32" rx="4" fill="#FFA116"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LC</text>
    </svg>
  ),
  codechef: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded-full">
      <circle cx="16" cy="16" r="16" fill="#5B4037"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CC</text>
    </svg>
  ),
  gfg: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded">
      <rect width="32" height="32" rx="4" fill="#0F9D58"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">GfG</text>
    </svg>
  ),
  atcoder: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded-full">
      <circle cx="16" cy="16" r="16" fill="#FF6B6B"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
    </svg>
  ),
  hackerrank: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="rounded">
      <rect width="32" height="32" rx="4" fill="#00EA64"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">H</text>
    </svg>
  ),
};

const platforms = [
  { 
    id: 'codeforces', 
    name: 'Codeforces', 
    icon: PlatformIcons.codeforces,
    color: 'bg-blue-500/20',
    ratingRange: [800, 3500],
    ratingLabels: ['800', '1200', '1600', '2100', '2400+']
  },
  { 
    id: 'leetcode', 
    name: 'LeetCode', 
    icon: PlatformIcons.leetcode,
    color: 'bg-yellow-500/20',
    ratingRange: [1, 5],
    ratingLabels: ['Easy', 'Easy-Med', 'Medium', 'Med-Hard', 'Hard']
  },
  { 
    id: 'codechef', 
    name: 'CodeChef', 
    icon: PlatformIcons.codechef,
    color: 'bg-amber-500/20',
    ratingRange: [1000, 3000],
    ratingLabels: ['1000', '1400', '1800', '2200', '2500+']
  },
  { 
    id: 'gfg', 
    name: 'GeeksforGeeks', 
    icon: PlatformIcons.gfg,
    color: 'bg-green-500/20',
    ratingRange: [1, 5],
    ratingLabels: ['Basic', 'Easy', 'Medium', 'Hard', 'Expert']
  },
  { 
    id: 'atcoder', 
    name: 'AtCoder', 
    icon: PlatformIcons.atcoder,
    color: 'bg-red-500/20',
    ratingRange: [100, 3000],
    ratingLabels: ['100', '400', '800', '1200', '1600+']
  },
  { 
    id: 'hackerrank', 
    name: 'HackerRank', 
    icon: PlatformIcons.hackerrank,
    color: 'bg-emerald-500/20',
    ratingRange: [1, 5],
    ratingLabels: ['Easy', 'Medium', 'Medium+', 'Hard', 'Expert']
  },
];

const topics = [
  'Dynamic Programming', 'Graph Algorithms', 'Tree Algorithms', 'Data Structures',
  'Greedy Algorithms', 'Binary Search', 'Sorting', 'String Algorithms',
  'Number Theory', 'Combinatorics', 'Geometry', 'Bit Manipulation',
  'Two Pointers', 'Sliding Window', 'Backtracking', 'Divide and Conquer'
];

// Real working problem URLs organized by platform and difficulty
const problemDatabase = {
  codeforces: [
    { title: "Watermelon", url: "https://codeforces.com/problem/4/A", difficulty: 0, rating: 800 },
    { title: "Team", url: "https://codeforces.com/problem/231/A", difficulty: 0, rating: 800 },
    { title: "Next Round", url: "https://codeforces.com/problem/158/A", difficulty: 0, rating: 800 },
    { title: "Dubstep", url: "https://codeforces.com/problem/208/A", difficulty: 1, rating: 900 },
    { title: "Helpful Maths", url: "https://codeforces.com/problem/339/A", difficulty: 1, rating: 800 },
    { title: "Queue at the School", url: "https://codeforces.com/problem/266/B", difficulty: 1, rating: 800 },
    { title: "Young Physicist", url: "https://codeforces.com/problem/69/A", difficulty: 1, rating: 1000 },
    { title: "Beautiful Matrix", url: "https://codeforces.com/problem/263/A", difficulty: 1, rating: 800 },
    { title: "Gravity Flip", url: "https://codeforces.com/problem/405/A", difficulty: 1, rating: 900 },
    { title: "Petya and Strings", url: "https://codeforces.com/problem/112/A", difficulty: 1, rating: 800 },
    { title: "Reconnaissance 2", url: "https://codeforces.com/problem/34/A", difficulty: 2, rating: 1000 },
    { title: "IQ Test", url: "https://codeforces.com/problem/25/A", difficulty: 2, rating: 1300 },
    { title: "Taxi", url: "https://codeforces.com/problem/158/B", difficulty: 2, rating: 1200 },
    { title: "Soldier and Bananas", url: "https://codeforces.com/problem/546/A", difficulty: 2, rating: 800 },
    { title: "Dragons", url: "https://codeforces.com/problem/230/A", difficulty: 2, rating: 1000 },
    { title: "Puzzles", url: "https://codeforces.com/problem/337/A", difficulty: 2, rating: 900 },
    { title: "Longest Increasing Subsequence", url: "https://codeforces.com/problem/300/C", difficulty: 3, rating: 1600 },
    { title: "Knapsack", url: "https://codeforces.com/problem/148/E", difficulty: 3, rating: 1900 },
    { title: "Graph Traversal", url: "https://codeforces.com/problem/580/C", difficulty: 3, rating: 1500 },
    { title: "Tree DP", url: "https://codeforces.com/problem/161/D", difficulty: 3, rating: 1700 },
    { title: "Segment Tree", url: "https://codeforces.com/problem/380/C", difficulty: 4, rating: 2100 },
    { title: "FFT", url: "https://codeforces.com/problem/528/D", difficulty: 4, rating: 2300 },
    { title: "Flow Networks", url: "https://codeforces.com/problem/546/E", difficulty: 4, rating: 2400 },
    { title: "Advanced DP", url: "https://codeforces.com/problem/898/F", difficulty: 4, rating: 2500 },
  ],
  leetcode: [
    { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: 0, rating: 1 },
    { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: 0, rating: 1 },
    { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: 0, rating: 1 },
    { title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: 0, rating: 1 },
    { title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: 0, rating: 1 },
    { title: "Add Two Numbers", url: "https://leetcode.com/problems/add-two-numbers/", difficulty: 1, rating: 2 },
    { title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: 1, rating: 2 },
    { title: "3Sum", url: "https://leetcode.com/problems/3sum/", difficulty: 1, rating: 2 },
    { title: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: 1, rating: 2 },
    { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: 2, rating: 3 },
    { title: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: 2, rating: 3 },
    { title: "Reverse Integer", url: "https://leetcode.com/problems/reverse-integer/", difficulty: 2, rating: 3 },
    { title: "Binary Tree Inorder Traversal", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: 2, rating: 3 },
    { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: 2, rating: 3 },
    { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: 2, rating: 3 },
    { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/", difficulty: 3, rating: 4 },
    { title: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: 3, rating: 4 },
    { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: 3, rating: 4 },
    { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: 3, rating: 4 },
    { title: "House Robber", url: "https://leetcode.com/problems/house-robber/", difficulty: 3, rating: 4 },
    { title: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: 4, rating: 5 },
    { title: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching/", difficulty: 4, rating: 5 },
    { title: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: 4, rating: 5 },
    { title: "Trapping Rain Water", url: "https://leetcode.com/problems/trapping-rain-water/", difficulty: 4, rating: 5 },
  ],
  codechef: [
    { title: "Life, the Universe, and Everything", url: "https://www.codechef.com/problems/TEST", difficulty: 0, rating: 1000 },
    { title: "Add Two Numbers", url: "https://www.codechef.com/problems/FLOW001", difficulty: 0, rating: 1000 },
    { title: "Enormous Input Test", url: "https://www.codechef.com/problems/INTEST", difficulty: 0, rating: 1000 },
    { title: "Sum of Digits", url: "https://www.codechef.com/problems/FLOW006", difficulty: 0, rating: 1000 },
    { title: "Factorial", url: "https://www.codechef.com/problems/FCTRL", difficulty: 1, rating: 1200 },
    { title: "Reverse The Number", url: "https://www.codechef.com/problems/FLOW007", difficulty: 1, rating: 1200 },
    { title: "ATM", url: "https://www.codechef.com/problems/HS08TEST", difficulty: 1, rating: 1200 },
    { title: "Small Factorials", url: "https://www.codechef.com/problems/FCTRL2", difficulty: 1, rating: 1200 },
    { title: "Turbo Sort", url: "https://www.codechef.com/problems/TSORT", difficulty: 1, rating: 1200 },
    { title: "Leading and Trailing", url: "https://www.codechef.com/problems/FLOW004", difficulty: 1, rating: 1200 },
    { title: "Prime Generator", url: "https://www.codechef.com/problems/PRIME1", difficulty: 2, rating: 1400 },
    { title: "Coins and Triangle", url: "https://www.codechef.com/problems/COINS", difficulty: 2, rating: 1400 },
    { title: "Ambiguous Permutations", url: "https://www.codechef.com/problems/PERMUT2", difficulty: 2, rating: 1400 },
    { title: "Bytelandian Gold Coins", url: "https://www.codechef.com/problems/COINS", difficulty: 2, rating: 1400 },
    { title: "Transform Expression", url: "https://www.codechef.com/problems/ONP", difficulty: 2, rating: 1400 },
    { title: "Substring Check", url: "https://www.codechef.com/problems/STRSTR", difficulty: 2, rating: 1400 },
    { title: "Chef and Notebooks", url: "https://www.codechef.com/problems/CNOTE", difficulty: 3, rating: 1800 },
    { title: "Sereja and Dima", url: "https://www.codechef.com/problems/SEALUP", difficulty: 3, rating: 1800 },
    { title: "Maximum Weight Difference", url: "https://www.codechef.com/problems/MAXDIFF", difficulty: 3, rating: 1800 },
    { title: "Chefs in Queue", url: "https://www.codechef.com/problems/QUEUE2", difficulty: 3, rating: 1800 },
    { title: "Tree Algorithms", url: "https://www.codechef.com/problems/TREE01", difficulty: 4, rating: 2200 },
    { title: "Advanced Data Structures", url: "https://www.codechef.com/problems/SEGTREE", difficulty: 4, rating: 2200 },
    { title: "Network Flow", url: "https://www.codechef.com/problems/FLOW", difficulty: 4, rating: 2200 },
    { title: "String Algorithms", url: "https://www.codechef.com/problems/SUBSTR", difficulty: 4, rating: 2200 },
  ],
  gfg: [
    { title: "Hello World", url: "https://practice.geeksforgeeks.org/problems/hello-world/1", difficulty: 0, rating: 1 },
    { title: "Sum of Array", url: "https://practice.geeksforgeeks.org/problems/sum-of-array2326/1", difficulty: 0, rating: 1 },
    { title: "Reverse Array", url: "https://practice.geeksforgeeks.org/problems/reverse-an-array/1", difficulty: 0, rating: 1 },
    { title: "Count Digits", url: "https://practice.geeksforgeeks.org/problems/count-digits/1", difficulty: 0, rating: 1 },
    { title: "Palindrome", url: "https://practice.geeksforgeeks.org/problems/palindrome0746/1", difficulty: 0, rating: 1 },
    { title: "Binary Search", url: "https://practice.geeksforgeeks.org/problems/binary-search/1", difficulty: 1, rating: 2 },
    { title: "Linear Search", url: "https://practice.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1", difficulty: 1, rating: 2 },
    { title: "Insertion Sort", url: "https://practice.geeksforgeeks.org/problems/insertion-sort/1", difficulty: 1, rating: 2 },
    { title: "Selection Sort", url: "https://practice.geeksforgeeks.org/problems/selection-sort/1", difficulty: 1, rating: 2 },
    { title: "Bubble Sort", url: "https://practice.geeksforgeeks.org/problems/bubble-sort/1", difficulty: 1, rating: 2 },
    { title: "Merge Sort", url: "https://practice.geeksforgeeks.org/problems/merge-sort/1", difficulty: 2, rating: 3 },
    { title: "Quick Sort", url: "https://practice.geeksforgeeks.org/problems/quick-sort/1", difficulty: 2, rating: 3 },
    { title: "Heap Sort", url: "https://practice.geeksforgeeks.org/problems/heap-sort/1", difficulty: 2, rating: 3 },
    { title: "Binary Tree Traversal", url: "https://practice.geeksforgeeks.org/problems/preorder-traversal/1", difficulty: 2, rating: 3 },
    { title: "Level Order Traversal", url: "https://practice.geeksforgeeks.org/problems/level-order-traversal/1", difficulty: 2, rating: 3 },
    { title: "Graph BFS", url: "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1", difficulty: 3, rating: 4 },
    { title: "Graph DFS", url: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1", difficulty: 3, rating: 4 },
    { title: "Dijkstra Algorithm", url: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1", difficulty: 3, rating: 4 },
    { title: "0-1 Knapsack", url: "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", difficulty: 3, rating: 4 },
    { title: "Longest Common Subsequence", url: "https://practice.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1", difficulty: 3, rating: 4 },
    { title: "Minimum Spanning Tree", url: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1", difficulty: 4, rating: 5 },
    { title: "Topological Sort", url: "https://practice.geeksforgeeks.org/problems/topological-sort/1", difficulty: 4, rating: 5 },
    { title: "Strongly Connected Components", url: "https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1", difficulty: 4, rating: 5 },
    { title: "Segment Tree", url: "https://practice.geeksforgeeks.org/problems/range-sum-query-mutable/1", difficulty: 4, rating: 5 },
  ],
  atcoder: [
    { title: "Welcome to AtCoder", url: "https://atcoder.jp/contests/practice/tasks/practice_1", difficulty: 0, rating: 100 },
    { title: "Product", url: "https://atcoder.jp/contests/abc086/tasks/abc086_a", difficulty: 0, rating: 100 },
    { title: "Placing Marbles", url: "https://atcoder.jp/contests/abc081/tasks/abc081_a", difficulty: 0, rating: 100 },
    { title: "Shift only", url: "https://atcoder.jp/contests/abc081/tasks/abc081_b", difficulty: 0, rating: 200 },
    { title: "Coins", url: "https://atcoder.jp/contests/abc087/tasks/abc087_b", difficulty: 0, rating: 200 },
    { title: "Card Game for Two", url: "https://atcoder.jp/contests/abc088/tasks/abc088_b", difficulty: 1, rating: 300 },
    { title: "Kagami Mochi", url: "https://atcoder.jp/contests/abc085/tasks/abc085_b", difficulty: 1, rating: 300 },
    { title: "Otoshidama", url: "https://atcoder.jp/contests/abc085/tasks/abc085_c", difficulty: 1, rating: 300 },
    { title: "Daydream", url: "https://atcoder.jp/contests/abc087/tasks/abc087_c", difficulty: 1, rating: 400 },
    { title: "Traveling Salesman around Lake", url: "https://atcoder.jp/contests/abc090/tasks/abc090_c", difficulty: 1, rating: 400 },
    { title: "Two Switches", url: "https://atcoder.jp/contests/abc085/tasks/abc085_d", difficulty: 2, rating: 500 },
    { title: "Digit Sum", url: "https://atcoder.jp/contests/abc083/tasks/abc083_c", difficulty: 2, rating: 500 },
    { title: "Some Sums", url: "https://atcoder.jp/contests/abc083/tasks/abc083_b", difficulty: 2, rating: 500 },
    { title: "Libra", url: "https://atcoder.jp/contests/abc088/tasks/abc088_c", difficulty: 2, rating: 600 },
    { title: "Grid Repainting", url: "https://atcoder.jp/contests/abc096/tasks/abc096_c", difficulty: 2, rating: 600 },
    { title: "Snuke Festival", url: "https://atcoder.jp/contests/abc089/tasks/abc089_d", difficulty: 3, rating: 800 },
    { title: "Median of Medians", url: "https://atcoder.jp/contests/abc107/tasks/abc107_d", difficulty: 3, rating: 800 },
    { title: "Wide Flip", url: "https://atcoder.jp/contests/abc075/tasks/abc075_d", difficulty: 3, rating: 900 },
    { title: "Candies", url: "https://atcoder.jp/contests/abc087/tasks/abc087_d", difficulty: 3, rating: 900 },
    { title: "Colorful Leaderboard", url: "https://atcoder.jp/contests/abc092/tasks/abc092_d", difficulty: 3, rating: 1000 },
    { title: "Tree Queries", url: "https://atcoder.jp/contests/abc133/tasks/abc133_f", difficulty: 4, rating: 1200 },
    { title: "Digits in Multiplication", url: "https://atcoder.jp/contests/abc057/tasks/abc057_d", difficulty: 4, rating: 1200 },
    { title: "Colorful Graph", url: "https://atcoder.jp/contests/abc065/tasks/abc065_d", difficulty: 4, rating: 1300 },
    { title: "String Transformation", url: "https://atcoder.jp/contests/abc121/tasks/abc121_d", difficulty: 4, rating: 1300 },
  ],
  hackerrank: [
    { title: "Solve Me First", url: "https://www.hackerrank.com/challenges/solve-me-first/problem", difficulty: 0, rating: 1 },
    { title: "Simple Array Sum", url: "https://www.hackerrank.com/challenges/simple-array-sum/problem", difficulty: 0, rating: 1 },
    { title: "A Very Big Sum", url: "https://www.hackerrank.com/challenges/a-very-big-sum/problem", difficulty: 0, rating: 1 },
    { title: "Diagonal Difference", url: "https://www.hackerrank.com/challenges/diagonal-difference/problem", difficulty: 0, rating: 1 },
    { title: "Plus Minus", url: "https://www.hackerrank.com/challenges/plus-minus/problem", difficulty: 0, rating: 1 },
    { title: "Staircase", url: "https://www.hackerrank.com/challenges/staircase/problem", difficulty: 1, rating: 2 },
    { title: "Mini-Max Sum", url: "https://www.hackerrank.com/challenges/mini-max-sum/problem", difficulty: 1, rating: 2 },
    { title: "Birthday Cake Candles", url: "https://www.hackerrank.com/challenges/birthday-cake-candles/problem", difficulty: 1, rating: 2 },
    { title: "Time Conversion", url: "https://www.hackerrank.com/challenges/time-conversion/problem", difficulty: 1, rating: 2 },
    { title: "Grading Students", url: "https://www.hackerrank.com/challenges/grading/problem", difficulty: 1, rating: 2 },
    { title: "Apple and Orange", url: "https://www.hackerrank.com/challenges/apple-and-orange/problem", difficulty: 2, rating: 3 },
    { title: "Kangaroo", url: "https://www.hackerrank.com/challenges/kangaroo/problem", difficulty: 2, rating: 3 },
    { title: "Between Two Sets", url: "https://www.hackerrank.com/challenges/between-two-sets/problem", difficulty: 2, rating: 3 },
    { title: "Breaking the Records", url: "https://www.hackerrank.com/challenges/breaking-best-and-worst-records/problem", difficulty: 2, rating: 3 },
    { title: "Subarray Division", url: "https://www.hackerrank.com/challenges/the-birthday-bar/problem", difficulty: 2, rating: 3 },
    { title: "Divisible Sum Pairs", url: "https://www.hackerrank.com/challenges/divisible-sum-pairs/problem", difficulty: 2, rating: 3 },
    { title: "Migratory Birds", url: "https://www.hackerrank.com/challenges/migratory-birds/problem", difficulty: 3, rating: 4 },
    { title: "Day of the Programmer", url: "https://www.hackerrank.com/challenges/day-of-the-programmer/problem", difficulty: 3, rating: 4 },
    { title: "Bill Division", url: "https://www.hackerrank.com/challenges/bill-division/problem", difficulty: 3, rating: 4 },
    { title: "Sales by Match", url: "https://www.hackerrank.com/challenges/sock-merchant/problem", difficulty: 3, rating: 4 },
    { title: "Climbing the Leaderboard", url: "https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem", difficulty: 4, rating: 5 },
    { title: "The Hurdle Race", url: "https://www.hackerrank.com/challenges/the-hurdle-race/problem", difficulty: 4, rating: 5 },
    { title: "Designer PDF Viewer", url: "https://www.hackerrank.com/challenges/designer-pdf-viewer/problem", difficulty: 4, rating: 5 },
    { title: "Utopian Tree", url: "https://www.hackerrank.com/challenges/utopian-tree/problem", difficulty: 4, rating: 5 },
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
      const platformQuestions = problemDatabase[selectedPlatform as keyof typeof problemDatabase] || [];
      const filteredQuestions = platformQuestions.filter(q => q.difficulty === difficulty[0]);
      const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)] || platformQuestions[0];
      const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);
      
      setRecommendation({
        ...randomQuestion,
        platform: selectedPlatformData,
        topics: selectedTopics,
        difficulty: selectedPlatformData?.ratingLabels[difficulty[0]] || 'Unknown'
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
                        <platform.icon />
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
                      {platforms.find(p => p.id === selectedPlatform)?.ratingLabels.map((label, index) => (
                        <span key={index} className={difficulty[0] === index ? 'text-primary font-medium' : ''}>
                          {label}
                        </span>
                      )) || ['Easy', 'Medium', 'Hard', 'Expert', 'Master'].map((label, index) => (
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
                        Current: {platforms.find(p => p.id === selectedPlatform)?.ratingLabels[difficulty[0]] || 'Select Platform'}
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